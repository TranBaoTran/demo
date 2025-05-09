import React, { useState, useEffect, useRef } from 'react';
import styles from './SmallHeader.module.css';
import headerstyles from '../Header/Header.module.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import productApi from '../../api/productApi';
import clickOutSide from '../DropDown/ClickOutside';
import { clearCart, clearToken, getToken } from '../../api/axiosClient';

const SmallHeader = () => {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoryItemRef = useRef(null);
  const profileItemRef = useRef(null);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const token = getToken();
  const navigate = useNavigate(); 
  const menuItem = [
    { text: 'Home', icon: <HomeIcon />, link: '/', display: true},
    { text: 'Category', icon: <CategoryIcon />, subMenu: true, display: true},
    { text: 'Login/Signup', icon: <LoginIcon />, link: '/login', isLogin: false, display: token ? false : true},
    { text: 'Profile', icon: <PersonIcon />, isLogin: true, subMenu: true, display: token ? true : false ,children: [
      {
        text: 'Logout',
        icon: <LogoutIcon />
      },
      {
        text: 'Admin',
        icon: <SupervisorAccountIcon />,
        link: '/admin'
      }
    ]}
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if(newOpen){
      setCategoryOpen(false);
      setProfileOpen(false);
    }
  };

  clickOutSide(categoryOpen ? dropdownRef : null, () => setCategoryOpen(false));
  clickOutSide(profileOpen ? profileDropdownRef : null, () => setProfileOpen(false));

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  const logout = () => {
    clearToken();
    clearCart();
    navigate('/');
  }

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


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItem.filter(item => item.display).map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            ref={item.text === 'Category' ? categoryItemRef : (item.text === 'Profile' ? profileItemRef : null)}
          >
            <ListItemButton
              component={item.subMenu ? 'div' : Link}
              to={item.link}
              sx={{ cursor: 'pointer' }}
              onClick={(event) => {
                event.stopPropagation();
                if (item.subMenu && item.text === 'Category') {
                  handleCategoryClick();
                } else if (item.subMenu && item.text === 'Profile') {
                  handleProfileClick();
                } else {
                  toggleDrawer(false);
                }
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subMenu && item.text === 'Category' && (categoryOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />)}
              {item.subMenu && item.text === 'Profile' && (profileOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />)}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const CategorySubMenuList = () => (
    <Box sx={{ width: 200 }} role="presentation" onClick={() => setCategoryOpen(false)} onKeyDown={() => setCategoryOpen(false)}>
      <List>
        {categories.map((subItem) => (
          <ListItem key={subItem.name} disablePadding>
            <ListItemButton component={Link} to={`/products?category=${subItem.slug}`}>
              <ListItemText primary={subItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const ProfileSubMenuList = () => { 
    return(
    <Box
      ref={profileDropdownRef}
      sx={{
        position: 'fixed',
        top: profileItemRef.current?.getBoundingClientRect().top || 100,
        left: profileItemRef.current?.getBoundingClientRect().right || 250,
        width: '150px',
        bgcolor: 'background.paper',
        boxShadow: 3,
        zIndex: 1600,
        borderRadius: 1,
      }}
      onClick={() => setProfileOpen(false)}
      onKeyDown={() => setProfileOpen(false)}
    >
      <List>
        {menuItem.find(item => item.text === 'Profile')?.children.map((child) => (
          <ListItem key={child.text} disablePadding onClick={(event) => {
            event.stopPropagation();
            if (child.text === 'Logout') {
              logout();
              setProfileOpen(false);
              setOpen(false);
            }
          }}>
            <ListItemButton component={Link} to={child.link}>
              <ListItemIcon>{child.icon}</ListItemIcon>
              <ListItemText primary={child.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )};

  return(
    <>
      <div className={styles.SmallHeader}>
        <div className={`${headerstyles.CartContainer} ${styles.Bar}`} onClick={toggleDrawer(true)}>
          <FontAwesomeIcon icon={faBars} className={headerstyles.IconMenu} />
        </div>
        <Link to="/">
          <img src='/Logo.png' alt='Logo' className={headerstyles.Logo}></img>
        </Link>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {categoryOpen && (
        <Box
          ref={dropdownRef}
          sx={{
            position: 'fixed',
            top: categoryItemRef.current?.getBoundingClientRect().top || 100,
            left: categoryItemRef.current?.getBoundingClientRect().right || 250,
            width: '250px',
            maxHeight: '70vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 3,
            zIndex: 1600,
            borderRadius: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            }
          }}
        >
          <CategorySubMenuList />
        </Box>
      )}

      {profileOpen && (
        <ProfileSubMenuList />
      )}
    </>
  )
};

export default SmallHeader;