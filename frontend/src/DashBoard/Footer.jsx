import React from 'react';
import './Footer.css';
import viettelLogo from '../assets/viettel-logo.jpg';

const Footer = () => {
  return (
    <footer className="footer-container">
      
      {/* TẦNG TRÊN: MÀU TRẮNG */}
      <div className="footer-top">
        
        {/* CỘT 1: ĐƠN VỊ CUNG CẤP */}
        <div className="footer-col center-col">
          <h3 className="footer-title">Đơn vị cung cấp</h3>
          <img src={viettelLogo} alt="Viettel Logo" className="footer-logo" />
          <p className="footer-slogan">Theo cách của bạn</p>
        </div>

        {/* CỘT 2: LIÊN HỆ - SỬA CẤU TRÚC Ở ĐÂY */}
        <div className="footer-col contact-col">
          <h3 className="footer-title contact-title">Liên hệ</h3>
          
          <div className="contact-item">
            {/* TAO THÊM WRAPPER BỌC ICON ĐỂ CANH HÀNG NÈ */}
            <div className="contact-icon-container">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <span>Tổng đài 18008168</span>
          </div>

          <div className="contact-item">
            {/* TAO THÊM WRAPPER BỌC ICON ĐỂ CANH HÀNG NÈ */}
            <div className="contact-icon-container">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <span>Giang Văn Minh, Ba Đình, HN</span>
          </div>
        </div>

      </div>

      {/* TẦNG DƯỚI: MÀU ĐỎ */}
      <div className="footer-bottom">
        <p>© 2026 viettelup.vn. All rights reserved</p>
      </div>

    </footer>
  );
};

export default Footer;