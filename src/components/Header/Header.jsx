import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import CategoryDropDown from '../DropDown/CategoryDropDown';
import { Link, useNavigate } from "react-router-dom";
import UserDropDown from '../DropDown/UserDropDown';
import { getToken } from '../../api/axiosClient';

const Header = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleClick = (direction, isReplace) => {
    navigate(direction, {replace: isReplace});
  };

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
      <FontAwesomeIcon icon={faCartShopping} className={styles.IconMenu} alt='Cart'/>
      <FontAwesomeIcon icon={faPhone} className={styles.IconMenu} />
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
