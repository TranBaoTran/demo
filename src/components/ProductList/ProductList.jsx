import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import productApi from '../../api/productApi';
import ProductPagination from '../ProductPagination/ProductPagination';

const ProductList = () => {
  const { page } = useParams();
  const currentPage = Number(page) || 1;
  const [products, setProducts] = useState([]);
  const [totalProduct,setTotalProduct] = useState(0);
  const productPerPage = 12;
  const [totalPage,setTotalPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(currentPage);
        const response = await productApi.getAll(currentPage, productPerPage);
        setProducts(response?.data.products || []);
        setTotalProduct(response?.data.total || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    setTotalPage(Math.ceil(totalProduct / productPerPage));
  }, [totalProduct])

  return(
    <>
      <div className={styles.ProductListContainer}>
        {products.map(product => 
          <ProductItem key={product.id} product={product} />
        )}
      </div>   
      <ProductPagination 
        totalPages = {totalPage}
        currentPage = {currentPage}
      />
    </>  
  )  
};

export default ProductList;
