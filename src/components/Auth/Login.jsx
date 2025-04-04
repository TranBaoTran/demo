import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineClose } from 'react-icons/ai'; 
import './Auth.css'; 
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import { storeToken } from '../../api/axiosClient';
import PasswordInput from './PasswordInput';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const userData = await authApi.login(username, password);
      storeToken(userData.data.accessToken);
      navigate('/');
    } catch (error) {
      alert('Wrong username or password.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ username: '', password: '' }); // Reset errors

    let valid = true;
    if (!username) {
      setError((prev) => ({ ...prev, username: 'Please enter your username.' }));
      valid = false;
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: 'Please enter your password.' }));
      valid = false;
    }

    if (valid) {
      handleLogin(username.trim(), password);
    }
  };

  return (
    <div className='outer-container'>
      <Link to="/"><IoArrowBack className='back-icon'/></Link>
      <div className="auth-container">
        <div className="form-section">
          <h2>Login</h2>
          <p className="form-description">Enter your username and password to log in.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label><span className="required">* </span>Username</label>
              {error.username && <span className="error-message">{error.username}</span>}
              <input 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label><span className="required">* </span>Password</label>
              {error.password && <span className="error-message">{error.password}</span>}
              <PasswordInput 
                password = {password}
                warning = "Enter your password!"
                setPassword = {setPassword}
              />
            </div>
            <button type="submit" className="submit-button">Login</button>
          </form>
          <div className="register-info">
            <p>Don't have an account?  <a href="/register">Sign up</a></p>       
          </div>
        </div>

        <div className="image-section">
          <img src='/Login.png' alt='Logo' className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
