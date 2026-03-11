// src/Page/PlanCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PlanCard.css';
// Nhớ tải icon ảnh thật về và đặt vào src/assets
import callIcon from '../assets/phone-icon.png';
import tv360Icon from '../assets/tv360-icon.png';
import cloudIcon from '../assets/cloud-icon.png';
import facebookIcon from '../assets/facebook-icon.png';
import messengerIcon from '../assets/messenger-icon.png';
import tiktokIcon from '../assets/tiktok-icon.png';
import youtubeIcon from '../assets/youtube-icon.png';


const PlanCard = ({ 
  id,
  planName, 
  dataValue, 
  dataUnit = '', 
  dataDuration = '/NGÀY', 
  price, 
  priceDuration = '/ THÁNG', 
  isFreeData = false,
  hasCallIcon = false, 
  hasTv360Icon = false, 
  hasCloudIcon = false,
  hasFacebookIcon = false,
  hasMessengerIcon = false,
  hasTiktokIcon = false,
  hasYoutubeIcon = false,
}) => {
  const hasAnyIcon = hasCallIcon || hasTv360Icon || hasCloudIcon || hasFacebookIcon || hasMessengerIcon || hasTiktokIcon || hasYoutubeIcon;
  return (
    <div className="plan-card">
      <div className="plan-header">
        <span className="plan-name">{planName}</span>
      </div>

      {/* 1. KHU VỰC DATA CHÍNH */}
      {isFreeData ? (
        <div className="plan-data-special">
          <div className="data-number-free">MIỄN PHÍ</div>
          <div className="data-subtext">Data truy cập</div>
        </div>
      ) : (
        <div className="plan-data">
          <span className="data-number">{dataValue}{dataUnit}</span>
          <span className="data-duration">{dataDuration}</span>
        </div>
      )}

      {/* 2. KHU VỰC ICON (Dùng chung khung cũ cho mọi loại icon) */}
      <div className="plan-middle-section">
        {hasAnyIcon ? (
          <div className="plan-free-info">
            {/* Nếu đang bật chữ MIỄN PHÍ to đùng rồi thì ẩn chữ nhỏ này đi */}
            {!isFreeData && <p>Miễn phí</p>}
            <div className="plan-icons-container">
              <div className="plan-icons-wrapper">
            {/* Tách icon ảnh thật */}
            {hasCallIcon && <img src={callIcon} alt="Call Icon" className="icon" />}
            {hasTv360Icon && <img src={tv360Icon} alt="TV360 Icon" className="icon" />}
            {hasCloudIcon && <img src={cloudIcon} alt="Cloud Icon" className="icon" />}
            {hasFacebookIcon && <img src={facebookIcon} alt="Facebook Icon" className="icon" />}
            {hasMessengerIcon && <img src={messengerIcon} alt="Messenger Icon" className="icon" />}
            {hasTiktokIcon && <img src={tiktokIcon} alt="TikTok Icon" className="icon" />}
            {hasYoutubeIcon && <img src={youtubeIcon} alt="YouTube Icon" className="icon" />}
          </div>
            </div>
          </div>
        ) : (
          /* Khối ẩn để giữ cho các thẻ luôn cao bằng nhau dù không có icon */
          <div style={{ minHeight: '54px' }}></div> 
        )}
      </div>

      {/* 3. KHU VỰC GIÁ TIỀN */}
      <div className="plan-price">
        <span className="price-number">{price}</span>
        <span className="price-unit"> {priceDuration}</span>
      </div>

      <div className="plan-actions">
        <button className="btn-register">Đăng ký</button>
        <Link className="btn-detail" to={`/plan/${id}`}>CHI TIẾT</Link>
      </div>
    </div>
  );
};

export default PlanCard;