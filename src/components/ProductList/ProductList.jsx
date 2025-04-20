import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import productApi from '../../api/productApi';
import ProductPagination from '../ProductPagination/ProductPagination';
import { getToken } from '../../api/axiosClient';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [products, setProducts] = useState([]);
  const [totalProduct,setTotalProduct] = useState(0);
  const productPerPage = 12;
  const pageDisplay = 6;
  const navigate = useNavigate();

  const handleProductClick = useCallback((productID) => {
    navigate('/product/detail/' + productID);
  }, [navigate]);  

  const handleAddToCart = useCallback((product) => {
    if (!getToken()) {
      alert("Please login to add product to cart.");
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    // Tạo bản sao mới của sản phẩm để tránh tham chiếu
    const productToAdd = { 
      ...product, 
      quantity: 1,
      addedAt: new Date().toISOString() // Thêm timestamp để sắp xếp
    };

    let newCart;
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại: tăng số lượng và đưa lên đầu
      newCart = [
        { 
          ...cart[existingProductIndex], 
          quantity: cart[existingProductIndex].quantity + 1,
          addedAt: new Date().toISOString() // Cập nhật timestamp
        },
        ...cart.filter(item => item.id !== product.id)
      ];
    } else {
      // Nếu là sản phẩm mới: thêm vào đầu mảng
      newCart = [productToAdd, ...cart];
    }

    localStorage.setItem('cartProducts', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.title} was added into cart.`);
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll(currentPage, productPerPage, category);
        setProducts(response?.data.products || []);
        setTotalProduct(response?.data.total || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, category]);

  const totalPage = useMemo(() => {
    return Math.ceil(totalProduct / productPerPage);
  }, [totalProduct, productPerPage]);

  return(
    <>
      <div className={styles.ProductListContainer}>
        {products.map(product => 
          <div key={product.id}>
            <ProductItem product={product} onAddToCart={() => handleAddToCart(product)} onProductDetail={() => handleProductClick(product.id)}/>
          </div>
        )}
      </div>   
      <ProductPagination 
        totalPages = {totalPage}
        pageDisplay = {pageDisplay}
        category= {category}
        currentPage={currentPage}
      />
    </>  
  )  
};

export default ProductList;
