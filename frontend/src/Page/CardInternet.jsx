// src/components/CardInternet.jsx
import React from 'react';
import './Internet.css';

const CardInternet = ({ plan }) => {
  const {
    id,
    planName,
    speed,
    speedIcon,
    features,
    priceText,
    price,
    priceUnit,
    featured,
    cornerDecoration
  } = plan;

  return (
    <div className={`internet-card ${featured ? 'featured-internet-card' : ''}`}>
      {/* Corner decoration (red triangle) */}
      {cornerDecoration && <div className="corner-decoration"></div>}

      {/* Speed section - at the top */}
      <div className="internet-speed-section">
        <img src={speedIcon} alt="Speed icon" className="internet-speed-icon" />
        <span className="speed-amount">{speed}</span>
      </div>

      {/* Plan name - header */}
      <div className="card-top">
        <h3 className="internet-plan-title">{planName}</h3>
      </div>

      {/* Features section */}
      <div className="internet-features-section">
        {features.map((feature, index) => (
          <div key={index} className="internet-feature-row">
            <img src={feature.icon} alt="Feature icon" className="internet-feature-icon" />
            <span className="internet-feature-text">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Decorative divider (red gradient) */}
      <div className="internet-divider" />

      {/* Price section */}
      <div className="internet-price-section">
        <span className="price-label">{priceText}</span>
        <div className="price-display">
          <span className="price-amount">{price}</span>
          <span className="price-unit">{priceUnit}</span>
        </div>
      </div>

      {/* Buttons section */}
      <div className="internet-action-section">
        <button className="internet-btn internet-red-btn">Đăng ký</button>
        <button className="internet-btn internet-white-btn">Chi tiết gói cước</button>
      </div>
    </div>
  );
};

export default CardInternet;