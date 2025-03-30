import React from 'react';
import './Auth.css'; // Import CSS chung

const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <div className="form-section">
        <h2>Quên Mật Khẩu</h2>
        <p className="form-description">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>
        <form>
          <div className="form-group">
            <label><span className="required">* </span>Tài khoản</label>
            <input type="text" placeholder="Nhập email của bạn" />
          </div>
          <button type="submit" className="submit-button">Gửi liên kết đặt lại</button>
        </form>
        <div className="social-buttons">
          <p>Bạn có thể quay lại <a href="/login">Đăng nhập</a> nếu nhớ mật khẩu.</p>
        </div>
      </div>

      <div className="image-section">
        <img src='/ForgotPassword.png' alt='Forgot Password' className="login-image" />
      </div>
    </div>
  );
};

export default ForgotPassword;