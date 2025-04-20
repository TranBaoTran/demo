import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css"; 
import CartProductItem from "../CartProductItem/CartProductItem";
import { useLocation } from "react-router-dom";


const ITEMS_PER_PAGE = 4;

const Cart = ({ onSelect, selectedItems, products, onUpdateCart }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        // const cartId = localStorage.getItem("cartId") || 1;
        // cartApi.getCartById(cartId).then((response) => {
        //     onUpdateCart(response.data.products);
        // });
        const savedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        onUpdateCart(savedProducts);
        // cartApi.getCartById(cartId).then((response) => {
        //   const products = response.data.products;
        //   localStorage.setItem("cartProducts", JSON.stringify(products));
      
        //   const savedProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        //   onUpdateCart(savedProducts);
        // });

        if (location.state?.justAdded) {
            setCurrentPage(1);
            if (location.state.selectedProductId) {
                onSelect(location.state.selectedProductId);
            }
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        pages.push(
            <button 
                key="first" 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
                className={styles['nav-button']}
            >
                «
            </button>
        );
        
        pages.push(
            <button 
                key="prev" 
                onClick={goToPreviousPage} 
                disabled={currentPage === 1}
                className={styles['nav-button']}
            >
                ‹
            </button>
        );

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pages.push(<span key="start-ellipsis" className={styles.ellipsis}>...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? styles.active : ''}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(<span key="end-ellipsis" className={styles.ellipsis}>...</span>);
        }

        pages.push(
            <button 
                key="next" 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className={styles['nav-button']}
            >
                ›
            </button>
        );
        
        pages.push(
            <button 
                key="last" 
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages}
                className={styles['nav-button']}
            >
                »
            </button>
        );

        return pages;
    };

    const handleQuantityChange = (id, change) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, quantity: Math.max(1, product.quantity + change) } : product
        );
        onUpdateCart(updatedProducts);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleRemove = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        onUpdateCart(updatedProducts);
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
        window.dispatchEvent(new Event('cartUpdated'));

        const newTotalPages = Math.ceil(updatedProducts.length / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
    };

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const paginatedProducts = products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className={styles.cart}>
            {products.length === 0 ? (
                // <p>Giỏ hàng đang trống</p>
                <div className={styles.emptyCartContainer}>
                    <img 
                        src='/empty_cart.png'
                        className={styles.emptyCart} 
                        alt="empty_cart"
                    />
                </div>
            ) : (
                <>
                    {paginatedProducts.map((product) => (
                        <CartProductItem 
                            key={product.id} 
                            product={product} 
                            onSelect={onSelect} 
                            isSelected={selectedItems.includes(product.id)}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    ))}

                    {}
                    <div className={styles.pagination}>
                        {/* <button onClick={goToPreviousPage} disabled={currentPage === 1}>←</button>
                        <span>{currentPage} / {totalPages}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>→</button> */}
                        {renderPageNumbers()}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;