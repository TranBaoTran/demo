import React from 'react';
import { Link, useParams } from "react-router-dom";
import styles from './ProductPagination.module.css';

const ProductPagination = ({ totalPages, pageDisplay, currentPage,category }) => {
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
        <Link to={`/products?category=${category}&page=${1}`}>&lt;&lt;</Link>
        <Link to={`/products?category=${category}&page=${Math.max(1, currentPage - 1)}`}>&lt;</Link>

        {pages.map((num) => 
          <Link
          to={`/products?category=${category}&page=${num}`}
          className={currentPage === num ? styles.active : ""}
          >
            {num}
          </Link>
        )}

        <Link to={`/products?category=${category}&page=${Math.min(totalPages, currentPage + 1)}`}>&gt;</Link>
        <Link to={`/products?category=${category}&page=${totalPages}`}>&gt;&gt;</Link>
      </div>
    </>
  )
};

export default ProductPagination;
