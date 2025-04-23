import React, {useEffect, useState, useRef } from "react";
import Cart from "../Cart/Cart";
import CartSummary from "../CartSummary/CartSummary";
import styles from "../CartPage/CartPage.module.css";
import { useLocation } from "react-router-dom";

const CartPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [stickyOffset, setStickyOffset] = useState(0);
    const summaryRef = useRef(null);

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

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (!footer || !summaryRef.current) return;
            
            const footerTop = footer.getBoundingClientRect().top;
            const summaryHeight = summaryRef.current.offsetHeight;
            
            if (footerTop < window.innerHeight) {
                setStickyOffset(footerTop - summaryHeight - 20);
            } else {
                setStickyOffset(0);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.cartItemsContainer}>
                    <Cart 
                        onSelect={handleSelect} 
                        selectedItems={selectedItems} 
                        products={products} 
                        onUpdateCart={handleUpdateCart} 
                    />
                </div>
                
                <div className={styles.summaryContainer}>
                    <CartSummary 
                        products={products} 
                        selectedItems={selectedItems} 
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;