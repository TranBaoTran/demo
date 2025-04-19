import React from "react";
import styles from "./CartProductItem.module.css";

const CartProductItem = ({ product, onSelect, isSelected, onQuantityChange, onRemove }) => {

    return (
      <div className={`${styles.product} ${isSelected ? styles.selected : ""}`} onClick={() => onSelect(product.id)}>
        <div className={styles.saleRibbon}>SALE</div>
        <img src={product.thumbnail} alt={product.title} className={styles.image} />
        <div className={styles.details}>
            <h3>{product.title}</h3>
            <p>Quantity: {product.quantity || "N/A"}</p>
            <p>Discount Percentage: <span style={{ color: "rgb(18, 152, 204)", fontWeight: "bold" }}> {product.discountPercentage || "N/A"}%</span></p>
            <p className={styles.price}>${product.price}</p>
        </div>
  
        <div className={styles.actions}>
          <div className={styles.quantityControls}>
            <button onClick={(e) => { e.stopPropagation(); onQuantityChange(product.id, -1); }}>−</button>
            <span>{product.quantity}</span>
            <button onClick={(e) => { e.stopPropagation(); onQuantityChange(product.id, 1); }}>+</button>
          </div>
  
          <img 
            src='/trash.png'
            alt="Remove" 
            className={styles.removeIcon} 
            onClick={(e) => { e.stopPropagation(); onRemove(product.id); }} 
          />
        </div>
  
        {/* {isSelected && <span className={styles.checkmark}>✔</span>} */}
      </div>
    );
  };
  
  export default CartProductItem;
