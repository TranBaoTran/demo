import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'; 
import { IoArrowBack } from "react-icons/io5";
import './Auth.css'; // Import CSS chung
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ username: '', email: '', password: '', confirmPassword: '' }); // Reset errors

    let valid = true;

    if (!username) {
      setError(prev => ({ ...prev, username: 'Please enter your username.' }));
      valid = false;
    }

    if (!email) {
      setError(prev => ({ ...prev, email: 'Please enter your email.' }));
      valid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
        valid = false;
      }
    }

    if (!password) {
      setError(prev => ({ ...prev, password: 'Please enter your password.' }));
      valid = false;
    }

    if (!confirmPassword) {
      setError(prev => ({ ...prev, confirmPassword: 'Please confirm your password.' }));
      valid = false;
    } else if (password !== confirmPassword) {
      setError(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      valid = false;
    }

    if (valid) {
      console.log('Registering with:', { username, email, password });
    }
  };

  return (
    <div className='outer-container'>
    <Link to="/"><IoArrowBack className='back-icon'/></Link>
    <div className="auth-container">
      <div className="form-section">
        <h2>Signup</h2>
        <p className="form-description">Create a new account</p>
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
          <label><span className="required">* </span>Email</label>
            {error.email && <span className="error-message">{error.email}</span>}
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label><span className="required">* </span>Password</label>
            {error.password && <span className="error-message">{error.password}</span>}
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label><span className="required">* </span>Confirm Password</label>
            {error.confirmPassword && <span className="error-message">{error.confirmPassword}</span>}
            <input 
              type="password" 
              placeholder="Re-enter your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Signup</button>
        </form>
        <div className="social-buttons">
          <button className="icon-button" style={{ color: '#000' }}><FaFacebookF style={{ color: '#3b5998' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><FaInstagram style={{ color: '#C13584' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><FaGoogle style={{ color: '#DB4437' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><AiOutlineClose style={{ color: '#000' }} /></button>
        </div>
        <div className="register-info">
          <p>Already have an account?</p>
          <a href="/login">Login</a>
        </div>
      </div>

      <div className="image-section">
        <img src='/Signup.png' alt='Register' className="register-image" />
      </div>
    </div>
    </div>
  );
};

export default Register;