// pages/ProductDetail.jsx
import React, {useCallback, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';
import productApi from '../../api/productApi';
import { getToken } from '../../api/axiosClient';
import './ProductDetails.css';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  // Cuộn lên đầu trang khi component được render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await productApi.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className='load-container'>
        <div className='loader'></div>
      </div>
    );
  }
  
  return (
    <div className="pd-container">
      <div className="pd-flex-wrapper">
        <div className="pd-image-column">
          <ProductImage thumbnail={product.thumbnail} images={product.images} />
        </div>
        <div className="pd-info-column">
          <ProductInfo product={product}/>
        </div>
      </div>
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}
