// components/ProductInfo.jsx
import React, { useState } from 'react';
import { FaStar, FaCartPlus, FaTruck, FaShieldAlt, FaFileAlt } from 'react-icons/fa';
import './ProductDetails.css';

function renderStars(rating) {
    const stars = [];
    const totalStars = 5;
  
    for (let i = 0; i < totalStars; i++) {
      const fill = Math.min(Math.max(rating - i, 0), 1);
      stars.push(
        <span key={i} className="pd-star-wrapper">
            <FaStar className="pd-star-base" />
            <FaStar
            className="pd-star-fill"
            style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }} // nghĩa là tô ?% từ trái sang phải
            />
        </span>
      );
    }
  
    return <span className="pd-stars">{stars}</span>;
}

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng trong state

  // Hàm xử lý tăng số lượng
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Hàm xử lý giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pd-info-container">
      <h1 className="pd-title">{product.title}</h1>
      <p className="pd-description">{product.description}</p>
      <div className="pd-inline-info">
        <span>Rating: {renderStars(product.rating)}</span>
        <span>| Min Order: {product.minimumOrderQuantity}</span>
        <span>| SKU: {product.sku}</span>
        <span>| 
            <a href={product.meta.qrCode} target="_blank" rel="noopener noreferrer" className="pd-link">QR Code</a>
        </span>
      </div>
      <div className="pd-price-group">
        <span className="pd-price"> {Math.ceil((product.price*(100-product.discountPercentage)/100) * 100) / 100}$</span>
        <span className="pd-old-price">${product.price.toFixed(2)}</span>
        <span className="pd-discount">-{product.discountPercentage}%</span>
      </div>
      <div className="pd-details-group">
        <span><strong>Brand:</strong> {product.brand}</span>
        <span>| <strong>Weight:</strong> {product.weight}g</span>
        <span>| <strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</span>
      </div>

      {/* Warranty Info */}
      <div className="pd-info-row">
        <strong>Warranty:</strong>
        <span><FaShieldAlt className="pd-info-icon" /> {product.warrantyInformation}</span>
      </div>

      {/* Shipping Info */}
      <div className="pd-info-row">
        <strong>Shipping:</strong>
        <span><FaTruck className="pd-info-icon" /> {product.shippingInformation}</span>
      </div>

      {/* Return Policy Info */}
      <div className="pd-info-row">
        <strong>Return Policy:</strong>
        <span><FaFileAlt className="pd-info-icon"/> {product.returnPolicy}</span>
      </div>

      <div className="pd-action-section">
        <div className="pd-quantity">
          <strong>Quantity:</strong>
          <div className="pd-quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <input type="number" value={quantity} min="1"  readOnly />
            <button onClick={increaseQuantity}>+</button>
          </div>
          <span className="pd-stock">{product.stock} pieces available</span>
        </div>

        <div className="pd-buttons">
          <button className="pd-btn-outline"><FaCartPlus/> Add To Cart</button>
          <button className="pd-btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}