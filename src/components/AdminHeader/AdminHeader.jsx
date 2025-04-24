import React, { useCallback, useState } from 'react';
import styles from './AdminHeader.module.css';
import { FaBoxOpen } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../api/axiosClient';

const AdminHeader = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const navigate = useNavigate();

  const handleSubMenuClick = useCallback((itemName) => {
    if(itemName === 'logout') {
      clearToken();
      navigate('/');
      return;
    }
    setSelectedSubMenu(itemName);
    navigate(`/admin/${itemName}`);
  }, [navigate]);

  return (
    <div className={styles.AdminHeader}>
      <div>
        <div className={styles.MenuContainer} style={{padding: '0'}}>
          <img src='/Logo.png' onClick={() => navigate('/')}></img>
        </div>
         
        {isProductOpen ? (
            <div className={`${styles.MenuContainer} ${styles.isMenuActive}`} onClick={() => setIsProductOpen(!isProductOpen)}>
              <div className={styles.MenuLeft}>
                <FaBoxOpen />
                <span>Products</span>
              </div>
              <IoIosArrowDropdown />
            </div>
          ) : (
            <div className={styles.MenuContainer} onClick={() => setIsProductOpen(!isProductOpen)}>
              <div className={styles.MenuLeft}>
                <FaBoxOpen />
                <span>Products</span>
              </div>
              <IoIosArrowDropright />
            </div>
          )}

        {isProductOpen && (
          <>
            <div className={`${styles.SubMenuContainer} ${selectedSubMenu === 'products' ? styles.isSubMenuActive : ''}`}
                 onClick={() => handleSubMenuClick('products')}>
              All products
            </div>
            <div className={`${styles.SubMenuContainer} ${selectedSubMenu === 'categories' ? styles.isSubMenuActive : ''}`}
                 onClick={() => handleSubMenuClick('categories')}>
              Categories
            </div>
          </>
        )}
        
      </div>
      
      <div className={styles.MenuContainer}>
        <div className={styles.MenuLeft}
             onClick={() => handleSubMenuClick('logout')}>
          <IoMdExit />
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
};

export default AdminHeader;
