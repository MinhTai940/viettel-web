// src/Page/PlanCard.jsx

import React, { useState } from "react";
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

  const [showModal, setShowModal] = useState(false);

  const hasAnyIcon =
    hasCallIcon ||
    hasTv360Icon ||
    hasCloudIcon ||
    hasFacebookIcon ||
    hasMessengerIcon ||
    hasTiktokIcon ||
    hasYoutubeIcon;

  // click đăng ký → mở popup
  const handleRegister = () => {
    if (!smsCode) return;
    setShowModal(true);
  };

  // gửi sms thật
  const sendSMS = () => {

    const phoneNumber = "290";
    const userPhone = "0763503399";

    const message = `${smsCode} ${userPhone}`;
    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    window.location.href = smsLink;
  };

  return (
    <>
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


      {/* ================= MODAL ================= */}
      {showModal && (

        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>

          <div style={{
            background: "white",
            padding: 30,
            borderRadius: 14,
            width: 420,
            textAlign: "center"
          }}>

            <h3 style={{ marginBottom: 10 }}>Thông báo</h3>

            <p style={{ lineHeight: 1.6 }}>
              Để đăng ký gói cước vui lòng soạn tin nhắn theo cú pháp
              <br />
              <b style={{ color: "#e5002b" }}>
                {smsCode} gửi 290
              </b>
            </p>

            <button
              onClick={sendSMS}
              style={{
                marginTop: 20,
                background: "#e5002b",
                color: "white",
                padding: "10px 25px",
                border: "none",
                borderRadius: 25,
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Đăng ký ngay
            </button>

            <br /><br />

            <button
              onClick={() => setShowModal(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#666"
              }}
            >
              Đóng
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default PlanCard;