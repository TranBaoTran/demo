import React, { useState, useEffect } from 'react';
import styles from './ProductList.module.css';
import ProductItem from '../ProductItem/ProductItem';
import productApi from '../../api/productApi';

const ProductList = () => {
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        setProducts(response?.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return(
    <>
      <div className={styles.ProductListContainer}>
        {products.map(product => 
          <ProductItem key={product.id} product={product} />
        )}
      </div>   
    </>  
  )  
};

export default ProductList;
