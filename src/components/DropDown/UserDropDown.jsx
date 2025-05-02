import React, { useEffect, useState, useRef } from 'react';
import styles from './DropDown.module.css';
import { clearCart, clearToken, getToken } from '../../api/axiosClient';
import authApi from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import clickOutSide from './ClickOutside';

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  clickOutSide(dropdownRef, () => setIsOpen(false));

  const handleClick = () => {
    if(getToken()){
        clearToken();
        clearCart();
        window.location.reload();
    }
  }

  useEffect(() => {
    const fetchMe = async () => {
      try{
        const response = await authApi.getMe()
        setUser(response.data)
      }catch(error){
        console.log('Error getting user: ', error);
      }
    }

    if(!user){
      fetchMe();
    }
  }, [user]); 

  return(
    <>
      <div className={styles.Dropdown}>
        <div
        className={styles.UserContainer} 
        onClick={() => setIsOpen(!isOpen)}>
        <img 
          className={styles.UserImage} 
          src={user?.image}
          ></img>
          <span className={styles.UserName}>{user?.firstName} {user?.lastName}</span>
        </div>  
        {isOpen && (
          <ul ref={dropdownRef} className={`${styles.SubMenu} ${styles.SubMenuRight}`}>
            <li className={`${styles.SubMenuItem} ${styles.UserSubMenuItem}`} onClick={() => navigate('/admin')}>To Admin</li>
            <li className={`${styles.SubMenuItem} ${styles.UserSubMenuItem}`} onClick={() => handleClick()}>Logout</li>
          </ul>
        )}
      </div>
    </>
    );
  };

export default UserDropDown;
