import React, { useState } from 'react';
import styles from './DropDown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { clearToken, getToken } from '../../api/axiosClient';

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if(getToken()){
        clearToken();
        window.location.reload();
    }
  }

  return(
    <>
      <div className={styles.Dropdown}>
        <FontAwesomeIcon icon={faUser} className={styles.IconMenu} onClick={() => setIsOpen(!isOpen)}/>
        {isOpen && (
          <ul className={`${styles.SubMenu} ${styles.SubMenuRight}`}>
            <li className={`${styles.SubMenuItem} ${styles.UserSubMenuItem}`}>Account</li>
            <li className={`${styles.SubMenuItem} ${styles.UserSubMenuItem}`} onClick={() => handleClick()}>Logout</li>
          </ul>
        )}
      </div>
    </>
    );
  };

export default UserDropDown;
