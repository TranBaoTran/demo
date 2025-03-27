// pages/ProductDetail.jsx
import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';
import './ProductDetails.css';

export default function ProductDetail() {
  const location = useLocation();
  const { product } = location.state; // Lấy product từ state đã truyền qua

  // Cuộn lên đầu trang khi component được render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Mảng rỗng [] đảm bảo chỉ chạy một lần khi component được render lần đầu

  return (
    <div className="pd-container">
      <div className="pd-flex-wrapper">
        <div className="pd-image-column">
          <ProductImage thumbnail={product.thumbnail} images={product.images} />
        </div>
        <div className="pd-info-column">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}
