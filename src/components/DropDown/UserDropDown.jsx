import React, { useEffect, useState } from 'react';
import styles from './DropDown.module.css';
import { clearToken, getToken } from '../../api/axiosClient';
import authApi from '../../api/authApi';

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();

  const handleClick = () => {
    if(getToken()){
        clearToken();
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
