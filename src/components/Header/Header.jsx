import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import CategoryDropDown from '../DropDown/CategoryDropDown';
import { Link, useNavigate } from "react-router-dom";
import UserDropDown from '../DropDown/UserDropDown';
import { getCart, getToken, getCartItems } from '../../api/axiosClient';

const Header = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [cartCount, setCartCount] = useState(getCartItems());

  const handleClick = (direction, isReplace) => {
    navigate(direction, {replace: isReplace});
  };

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItems());
    };

    window.addEventListener('cartUpdated', updateCartCount);
    updateCartCount();
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, [])

  return (
    <>
    <nav className={styles.Header}>

    <div className={styles.HeaderLeft}>
      <Link to="/">
      <img src='/Logo.png' alt='Logo' className={styles.Logo}></img>
      </Link>
        <CategoryDropDown />
        <div className={styles.SearchBarContainer}>
          <input type='text' className={styles.SearchBarInput} placeholder='Search'></input>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.IconMenu}/>
      </div>
    </div>

    <div className={styles.HeaderRight}>
    <div className={styles.CartContainer}>
      <Link 
        to="/cart" 
        className={styles.CartLink}
      >
      <FontAwesomeIcon icon={faCartShopping} className={styles.IconMenu} alt="Cart" />
      {getCart().length!=0 ? (<span className={styles.dot}>{cartCount}</span>):(<span></span>)}
      </Link>
    </div>
    <div className={styles.CartContainer}>
      <FontAwesomeIcon icon={faPhone} className={styles.IconMenu} />
    </div> 
      {token ? (
        <UserDropDown />
      ) : (
        <button className={styles.SignButton} onClick={() => handleClick("/login", true)}>
          Sign In / Sign Up
        </button>
      )}
    </div>
    </nav>
    </>
  ) 
};

export default Header;
