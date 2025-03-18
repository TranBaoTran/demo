import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';
import CategoryDropDown from '../CategoryDropDown/CategoryDropDown';
import { Link } from "react-router-dom";

const Header = () => (
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
      <button className={styles.SignButton}>Sign In / Sign Up</button>
    </div>
  </nav>
);

export default Header;
