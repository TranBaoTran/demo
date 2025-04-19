import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import productApi from '../../api/productApi';
import ProductPagination from '../ProductPagination/ProductPagination';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [products, setProducts] = useState([]);
  const [totalProduct,setTotalProduct] = useState(0);
  const productPerPage = 12;
  const pageDisplay = 6;
  const navigate = useNavigate();

  // Hàm xử lý khi click vào sản phẩm
  // const handleProductClick = (product) => {
  //   navigate('/product/detail/' + product.id);
  // };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cartProducts', JSON.stringify(cart));
    alert(`${product.title} đã được thêm vào giỏ hàng.`);
  };
  
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
            <ProductItem product={product} onAddToCart={handleAddToCart}/>
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
