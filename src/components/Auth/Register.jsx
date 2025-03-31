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
    setError({ username: '', email: '', password: '', confirmPassword: '' }); // Reset lỗi

    let valid = true;

    if (!username) {
      setError(prev => ({ ...prev, username: 'Vui lòng nhập tên tài khoản.' }));
      valid = false;
    }

    if (!email) {
      setError(prev => ({ ...prev, email: 'Vui lòng nhập email.' }));
      valid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError(prev => ({ ...prev, email: 'Vui lòng nhập địa chỉ email hợp lệ.' }));
        valid = false;
      }
    }

    if (!password) {
      setError(prev => ({ ...prev, password: 'Vui lòng nhập mật khẩu.' }));
      valid = false;
    }

    if (!confirmPassword) {
      setError(prev => ({ ...prev, confirmPassword: 'Vui lòng xác nhận mật khẩu.' }));
      valid = false;
    } else if (password !== confirmPassword) {
      setError(prev => ({ ...prev, confirmPassword: 'Mật khẩu xác nhận không khớp.' }));
      valid = false;
    }

    if (valid) {
      console.log('Đăng ký với:', { username, email, password });
    }
  };

  return (
    <div className='outer-container'>
    <Link to="/"><IoArrowBack className='back-icon'/></Link>
    <div className="auth-container">
      <div className="form-section">
        <h2>Đăng ký</h2>
        <p className="form-description">Đăng ký tài khoản mới</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label><span className="required">* </span>Tài khoản</label>
            {error.username && <span className="error-message">{error.username}</span>}
            <input 
              type="text" 
              placeholder="Nhập tài khoản của bạn" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label><span className="required">* </span>Email</label>
            {error.email && <span className="error-message">{error.email}</span>}
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label><span className="required">* </span>Mật khẩu</label>
            {error.password && <span className="error-message">{error.password}</span>}
            <input 
              type="password" 
              placeholder="Nhập mật khẩu" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label><span className="required">* </span>Xác nhận mật khẩu</label>
            {error.confirmPassword && <span className="error-message">{error.confirmPassword}</span>}
            <input 
              type="password" 
              placeholder="Nhập lại mật khẩu" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Đăng ký</button>
        </form>
        <div className="social-buttons">
          <button className="icon-button" style={{ color: '#000' }}><FaFacebookF style={{ color: '#3b5998' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><FaInstagram style={{ color: '#C13584' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><FaGoogle style={{ color: '#DB4437' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><AiOutlineClose style={{ color: '#000' }} /></button>
        </div>
        <div className="register-info">
          <p>Bạn đã có tài khoản?</p>
          <a href="/login">Đăng nhập</a>
        </div>
      </div>

      <div className="image-section">
        <img src='/Register.png' alt='Register' className="register-image" />
      </div>
    </div>
    </div>
  );
};

export default Register;