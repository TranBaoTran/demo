import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import styles from './DropDown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import productApi from '../../api/productApi';
import clickOutSide from './ClickOutside';

const CategoryDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  clickOutSide(dropdownRef, () => setIsOpen(false));
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productApi.getAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return(
    <>
      <div className={styles.Dropdown} >
        <FontAwesomeIcon icon={faBars} className={styles.IconMenu} onClick={() => setIsOpen(!isOpen)}/>
        {isOpen && (
          <ul ref={dropdownRef} className={styles.SubMenu}>
            {categories.map((category) => (
              <li key={category.slug} className={styles.SubMenuItem}>
                <Link className={styles.SubMenuLink} onClick={() => setIsOpen(!isOpen)} to={`/products?category=${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
    );
  };

export default CategoryDropDown;
