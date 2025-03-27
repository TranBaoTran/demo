// components/ProductReviews.jsx
import React from 'react';
import './ProductDetails.css';

export default function ProductReviews({ reviews }) {
  return (
    <div className="pd-reviews-container">
      <h2 className="pd-review-title">Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="pd-review">
          <p className="pd-review-name">{review.reviewerName} ({review.rating} ⭐)</p>
          <p className="pd-review-comment">{review.comment}</p>
          <p className="pd-review-date">{new Date(review.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
