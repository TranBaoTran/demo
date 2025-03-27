import React, {useState} from 'react';
import './ProductDetails.css';

export default function ProductImage({ thumbnail, images }) {
  // State để lưu trữ ảnh được chọn
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  
  // Hàm để thay đổi ảnh thumbnail khi người dùng chọn ảnh từ gallery
  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  return (
    <div className="pd-image-container">
      <img src={selectedImage} alt="Product Thumbnail" className="pd-thumbnail" />
      <div className="pd-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product ${index}`}
            className="pd-gallery-image"
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>
    </div>
  );
}