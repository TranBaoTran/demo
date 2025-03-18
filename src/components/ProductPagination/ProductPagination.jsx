import React from 'react';
import { Link, useParams } from "react-router-dom";
import styles from './ProductPagination.module.css';

const ProductPagination = ({ totalPages, pageDisplay }) => {
  const { page } = useParams();
  const currentPage = Number(page) || 1;
  let startPage = Math.max(1, currentPage - Math.floor(pageDisplay / 2));
  let endPage = Math.min(totalPages, startPage + pageDisplay - 1);
  if (endPage - startPage < pageDisplay - 1) {
    startPage = Math.max(1, endPage - pageDisplay + 1);
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
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
