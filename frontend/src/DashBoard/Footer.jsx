import React from 'react';
import './Footer.css';
import viettelLogo from '../assets/viettel-logo.jpg';

const Footer = () => {
  return (
    <footer className="footer-container">

      {/* TOP */}
      <div className="footer-top">

        {/* CỘT 1 */}
        <div className="footer-col center-col">
          <h3 className="footer-title">Đơn vị cung cấp</h3>
          <img src={viettelLogo} alt="Viettel Logo" className="footer-logo" />
          <p className="footer-slogan">Theo cách của bạn</p>
        </div>

        {/* CỘT 2 */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">Liên hệ</h3>

          <div className="contact-item">
            <div className="contact-icon-container">
              📞
            </div>
            <span>0977338788</span>
          </div>

          <div className="contact-item">
            <div className="contact-icon-container">
              📍
            </div>
            <span>Lô số 20 KDC Phú An, p.Hưng Phú. TP.Cần Thơ</span>
          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 viettelup.vn. All rights reserved</p>
      </div>

    </footer>
  );
};

export default Footer;