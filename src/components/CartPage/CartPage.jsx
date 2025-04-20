import React, {useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import CartSummary from "../CartSummary/CartSummary";
import styles from "../Cart/Cart.module.css";
import { useLocation } from "react-router-dom";

const CartPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const location = useLocation();

    const handleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleUpdateCart = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));

        if (location.state?.justAdded) {
            setSelectedItems([location.state.selectedProductId]);
            window.history.replaceState({}, document.title);
        }
    };

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        setProducts(savedProducts);

        if (location.state?.selectedProductId && location.state?.justAdded) {
            setSelectedItems([location.state.selectedProductId]);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // const handleCheckout = () => {
    //     if (selectedItems.length === 0) {
    //         alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
    //         return;
    //     }
    //     navigate("/checkout", { state: { selectedItems } });
    // };

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