import React from "react";
import styles from "./CartSummary.module.css";

const CartSummary = ({ products, selectedItems }) => {
  const calculateSubtotal = () => {
    return products
      .filter((product) => selectedItems.includes(product.id))
      .reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    return products
      .filter((product) => selectedItems.includes(product.id))
      .reduce((total, product) => {
        const discountedPrice = product.price * (1 - product.discountPercentage / 100);
        return total + discountedPrice * product.quantity;
      }, 0)
      .toFixed(2);
  };

  const additionalServiceFee = 10.00; // Phí dịch vụ bổ sung

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Payment Summary</h2>
      
      <div className={styles.accountStatus}>UNREGISTERED ACCOUNT</div>
      
      <div className={styles.transactionCode}>Transaction code: VC115665</div>
      
      <div className={styles.couponSection}>
        <input 
          type="text" 
          placeholder="COUPON CODE" 
          className={styles.couponInput}
        />
        <button className={styles.applyButton}>Apply</button>
      </div>
      
      <div className={styles.sectionTitle}>Order Summary</div>
      <div className={styles.priceRow}>
        <span>Subtotal</span>
        <span>${calculateSubtotal()}</span>
      </div>
      <div className={styles.priceRow}>
        <span>Discount</span>
        <span>-${(calculateSubtotal() - calculateTotal()).toFixed(2)}</span>
      </div>
      
      <div className={styles.sectionTitle}>Additional Service</div>
      <div className={styles.priceRow}>
        <span>Service Fee</span>
        <span>${additionalServiceFee.toFixed(2)}</span>
      </div>
      
      <div className={styles.totalAmount}>
        <span>Total Amount</span>
        <span>${(parseFloat(calculateTotal()) + additionalServiceFee).toFixed(2)}</span>
      </div>
      
      {/* <div className={styles.saleTimer}>
        SALE EXPIRING IN: 21 HOURS, 31 MINUTES
      </div> */}
      
      <button 
        className={styles.checkoutButton} 
        disabled={selectedItems.length === 0}
      >
        Check Out
      </button>
    </div>
  );
};

export default CartSummary;