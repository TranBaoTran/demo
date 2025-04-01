import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'; 
import { IoArrowBack } from "react-icons/io5";
import './Auth.css'; // Import CSS chung
import { Link } from 'react-router-dom';
import PasswordInput from './PasswordInput';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' }); // Reset errors

    let valid = true;

    if (!firstname) {
      setError(prev => ({ ...prev, firstname: 'Please enter your first name.' }));
      valid = false;
    }

    if (!lastname) {
      setError(prev => ({ ...prev, lastname: 'Please enter your last name.' }));
      valid = false;
    }

    if (!username) {
      setError(prev => ({ ...prev, username: 'Please enter your username.' }));
      valid = false;
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
      console.log('Registering with:', { firstname, lastname, username, password });
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
            <div className="form-group-row">
              <div className="form-group">
                <label><span className="required">* </span>First Name</label>
                {error.firstname && <span className="error-message">{error.firstname}</span>}
                <input 
                  type="text" 
                  placeholder="Enter your first name" 
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><span className="required">* </span>Last Name</label>
                {error.lastname && <span className="error-message">{error.lastname}</span>}
                <input 
                  type="text" 
                  placeholder="Enter your last name" 
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
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
                password={password}
                warning="Enter your password!"
                setPassword={setPassword}
              />
            </div>
            <div className="form-group">
              <label><span className="required">* </span>Confirm Password</label>
              {error.confirmPassword && <span className="error-message">{error.confirmPassword}</span>}
              <PasswordInput 
                password={confirmPassword}
                warning="Re-enter your password" 
                setPassword={setConfirmPassword}
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