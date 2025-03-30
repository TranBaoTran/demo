import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaGoogle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'; 
import './Auth.css'; // Import CSS chung

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ email: '', password: '' }); // Reset lỗi

    let valid = true;
    if (!email) {
      setError((prev) => ({ ...prev, email: 'Vui lòng nhập tài khoản.' }));
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError((prev) => ({ ...prev, email: 'Vui lòng nhập địa chỉ email hợp lệ.' }));
      valid = false;
    }

    if (!password) {
      setError((prev) => ({ ...prev, password: 'Vui lòng nhập mật khẩu.' }));
      valid = false;
    }

    if (valid) {
      console.log('Đăng nhập với:', { email, password });
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <h2>Đăng nhập</h2>
        <p className="form-description">Nhập tài khoản và mật khẩu để đăng nhập hệ thống</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><span className="required">* </span>Tài khoản</label>
            {error.email && <span className="error-message">{error.email}</span>}
            <input 
              type="text" 
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
              placeholder="Nhập mật khẩu !" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Lưu mật khẩu</label>
          </div>
          <p className="forgot-password"><a href='/forgotpassword'>Quên mật khẩu?</a></p>
          <button type="submit" className="submit-button">Đăng nhập</button>
        </form>
        <div className="social-buttons">
          <button className="icon-button" style={{ color: '#000' }}><FaFacebookF style={{ color: '#3b5998' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><FaInstagram style={{ color: '#C13584' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><FaGoogle style={{ color: '#DB4437' }} /></button>
          <button className="icon-button" style={{ color: '#000' }}><AiOutlineClose style={{ color: '#000' }} /></button>
        </div>
        <div className="register-info">
          <p>Bạn chưa có tài khoản?</p>
          <a href="/register">Đăng ký</a>
        </div>
      </div>

      <div className="image-section">
        <img src='/Login.png' alt='Logo' className="login-image" />
      </div>
    </div>
  );
};

export default Login;