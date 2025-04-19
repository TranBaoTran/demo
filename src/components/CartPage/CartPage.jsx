import React, {useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import CartSummary from "../CartSummary/CartSummary";
import styles from "../Cart/Cart.module.css";

const CartPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState([]);

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleUpdateCart = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
    };

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        setProducts(savedProducts);
    }, []);

    return (
        <div className={styles.container}>
            <Cart 
                onSelect={handleSelect} 
                selectedItems={selectedItems} 
                products={products} 
                onUpdateCart={handleUpdateCart} 
            />
            <CartSummary products={products} selectedItems={selectedItems} />
        </div>
    );
};

export default CartPage;