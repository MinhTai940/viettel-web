// src/Page/PlanCard.jsx
import React from 'react';
import './PlanCard.css';

const PlanCard = ({
  planName,
  dataValue,
  dataUnit,
  price,
  duration,
  smsCode,
  hasCallIcon,
  hasTv360Icon,
  hasCloudIcon
}) => {

  const handleRegister = () => {

    alert(`Thông báo

Để đăng ký gói cước, vui lòng soạn tin nhắn theo cú pháp:

${smsCode} gửi 290`)

  }

  return (
    <div className="plan-card">

      {/* Tên gói cước */}
      <div className="plan-header">
        <span className="plan-name">{planName}</span>
      </div>

      {/* Data */}
      <div className="plan-data">
        <span className="data-number">{dataValue}{dataUnit}</span>
        <span className="data-unit">/NGÀY</span>
      </div>

      {/* Free services */}
      <div className="plan-free-info">
        <p>Miễn phí</p>

        <div className="plan-icons-container">
          <div className="plan-icons-wrapper">

            {/* Icon có thể thêm sau */}
            {/* {hasCallIcon && <img src={callIcon} alt="Call Icon" className="icon" />}
            {hasTv360Icon && <img src={tv360Icon} alt="TV360 Icon" className="icon" />}
            {hasCloudIcon && <img src={cloudIcon} alt="Cloud Icon" className="icon" />} */}

          </div>
        </div>

      </div>

      {/* Price */}
      <div className="plan-price">

        <span className="price-number">
          {price.toLocaleString()}đ
        </span>

        <span className="price-unit">
          {" / "}{duration}
        </span>

      </div>

      {/* Buttons */}
      <div className="plan-actions">

        <button
          className="btn-register"
          onClick={handleRegister}
        >
          Đăng ký
        </button>

        <button className="btn-detail">
          CHI TIẾT
        </button>

      </div>

    </div>
  );
};

export default PlanCard;