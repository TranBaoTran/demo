import React from 'react';
import { Link, useParams } from "react-router-dom";
import styles from './ProductPagination.module.css';

const ProductPagination = ({ totalPages }) => {
  const { page } = useParams();
  const currentPage = Number(page) || 1;
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  
  return (
    <>
      <div className={styles.ProductPagination}>
        <Link to={`/products/${1}`}>&lt;&lt;</Link>
        <Link to={`/products/${Math.max(1, currentPage - 1)}`}>&lt;</Link>

        {pages.map((num) => 
          <Link
          to={`/products/${num}`}
          className={currentPage === num ? styles.active : ""}
          >
            {num}
          </Link>
        )}

        <Link to={`/products/${Math.min(totalPages, currentPage + 1)}`}>&gt;</Link>
        <Link to={`/products/${totalPages}`}>&gt;&gt;</Link>
      </div>
    </>
  )
};

export default ProductPagination;
