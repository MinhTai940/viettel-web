// src/Page/PlanCard.jsx
import React from 'react';
import './PlanCard.css';
// Nhớ tải icon ảnh thật về và đặt vào src/assets
import callIcon from '../assets/call-icon.png';
import tv360Icon from '../assets/tv360-icon.png';
import cloudIcon from '../assets/cloud-icon.png';

const PlanCard = ({ planName, dataValue, dataUnit, price, hasCallIcon, hasTv360Icon, hasCloudIcon }) => {
  return (
    <div className="plan-card">
      {/* Tên gói cước - Đặt nó ở đầu */}
      <div className="plan-header">
        <span className="plan-name">{planName}</span>
      </div>

      {/* Dung lượng Data */}
      <div className="plan-data">
        <span className="data-number">{dataValue}{dataUnit}</span>
        <span className="data-unit">/NGÀY</span>
      </div>

      {/* Phần dịch vụ miễn phí và icon */}
      <div className="plan-free-info">
        <p>Miễn phí</p>
        <div className="plan-icons-container">
          <div className="plan-icons-wrapper">
            {/* Tách icon ảnh thật */}
            {hasCallIcon && <img src={callIcon} alt="Call Icon" className="icon" />}
            {hasTv360Icon && <img src={tv360Icon} alt="TV360 Icon" className="icon" />}
            {hasCloudIcon && <img src={cloudIcon} alt="Cloud Icon" className="icon" />}
          </div>
        </div>
      </div>

      {/* Giá tiền */}
      <div className="plan-price">
        <span className="price-number">{price}</span>
        <span className="price-unit"> / THÁNG</span>
      </div>

      {/* Nút bấm */}
      <div className="plan-actions">
        <button className="btn-register">Đăng ký</button>
        <button className="btn-detail">CHI TIẾT</button>
      </div>
    </div>
  );
};

export default PlanCard;