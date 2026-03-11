// src/Page/PlanCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./PlanCard.css";

import callIcon from "../assets/phone-icon.png";
import tv360Icon from "../assets/tv360-icon.png";
import cloudIcon from "../assets/cloud-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import messengerIcon from "../assets/messenger-icon.png";
import tiktokIcon from "../assets/tiktok-icon.png";
import youtubeIcon from "../assets/youtube-icon.png";

const PlanCard = ({
  id,
  planName,
  dataValue,
  dataUnit = "",
  dataDuration = "/NGÀY",
  price,
  priceDuration = "/ THÁNG",
  smsCode = "",
  isFreeData = false,
  hasCallIcon = false,
  hasTv360Icon = false,
  hasCloudIcon = false,
  hasFacebookIcon = false,
  hasMessengerIcon = false,
  hasTiktokIcon = false,
  hasYoutubeIcon = false,
}) => {

  const hasAnyIcon =
    hasCallIcon ||
    hasTv360Icon ||
    hasCloudIcon ||
    hasFacebookIcon ||
    hasMessengerIcon ||
    hasTiktokIcon ||
    hasYoutubeIcon;

  const handleRegister = () => {

    if (!smsCode) return;

    const phoneNumber = "290";

    const userPhone = "0763503399"; // số điện thoại gán cứng

    const message = `${smsCode} ${userPhone}`;

    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    window.location.href = smsLink;

  };

  return (
    <div className="plan-card">

      {/* Tên gói */}
      <div className="plan-header">
        <span className="plan-name">{planName}</span>
      </div>

      {/* DATA */}
      {isFreeData ? (
        <div className="plan-data-special">
          <div className="data-number-free">MIỄN PHÍ</div>
          <div className="data-subtext">Data truy cập</div>
        </div>
      ) : (
        <div className="plan-data">
          <span className="data-number">
            {dataValue}
            {dataUnit}
          </span>

          <span className="data-duration">{dataDuration}</span>
        </div>
      )}

      {/* ICON */}
      <div className="plan-middle-section">

        {hasAnyIcon ? (
          <div className="plan-free-info">

            {!isFreeData && <p>Miễn phí</p>}

            <div className="plan-icons-container">
              <div className="plan-icons-wrapper">

                {hasCallIcon && (
                  <img src={callIcon} alt="call" className="icon" />
                )}

                {hasTv360Icon && (
                  <img src={tv360Icon} alt="tv360" className="icon" />
                )}

                {hasCloudIcon && (
                  <img src={cloudIcon} alt="cloud" className="icon" />
                )}

                {hasFacebookIcon && (
                  <img src={facebookIcon} alt="facebook" className="icon" />
                )}

                {hasMessengerIcon && (
                  <img src={messengerIcon} alt="messenger" className="icon" />
                )}

                {hasTiktokIcon && (
                  <img src={tiktokIcon} alt="tiktok" className="icon" />
                )}

                {hasYoutubeIcon && (
                  <img src={youtubeIcon} alt="youtube" className="icon" />
                )}

              </div>
            </div>

          </div>
        ) : (
          <div style={{ minHeight: "54px" }}></div>
        )}

      </div>

      {/* PRICE */}
      <div className="plan-price">
        <span className="price-number">
          {Number(price).toLocaleString()}đ
        </span>

        <span className="price-unit">
          {" "}
          {priceDuration}
        </span>
      </div>

      {/* BUTTON */}
      <div className="plan-actions">

        <button
          className="btn-register"
          onClick={handleRegister}
        >
          Đăng ký
        </button>

        <Link className="btn-detail" to={`/plan/${id}`}>
          CHI TIẾT
        </Link>

      </div>

    </div>
  );
};

export default PlanCard;