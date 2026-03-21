import React, { useState } from "react"
import "./Internet.css"

const CardInternet = ({ data }) => {

  // ⭐ mặc định chọn tỉnh
  const [area, setArea] = useState("tinh")

  const price =
    area === "hn"
      ? data.price_hn
      : data.price_tinh

  return (
    <div className="internet-card">

      {/* SPEED */}
      <div className="internet-speed-section">
        <span className="speed-amount">
          {data.speed}
        </span>
      </div>

      {/* NAME */}
      <div className="card-top">
        <h3 className="internet-plan-title">
          {data.name}
        </h3>
      </div>

      {/* FEATURES */}
      <div className="internet-features-section">

        {/* MODEM */}
        {data.modem && (
          <div className="internet-feature-row">
            <span className="internet-feature-text">
              1 Modem {data.modem}
            </span>
          </div>
        )}

        {/* MESH */}
        {data.mesh && (
          <div className="internet-feature-row">
            <span className="internet-feature-text">
              + 1 Mesh Wifi
            </span>
          </div>
        )}

        {/* DESCRIPTION */}
        {data.description && (
          <div className="internet-feature-row">
            <span className="internet-feature-text">
              {data.description}
            </span>
          </div>
        )}

      </div>

      {/* AREA */}
      <div className="internet-feature-row">
        <span className="internet-feature-text">
          Khu vực lắp đặt
        </span>

        <div style={{ marginTop: 5 }}>
          <label style={{ marginRight: 15 }}>
            <input
              type="radio"
              checked={area === "hn"}
              onChange={() => setArea("hn")}
            />
            HN & TP.HCM
          </label>

          <label>
            <input
              type="radio"
              checked={area === "tinh"}
              onChange={() => setArea("tinh")}
            />
            Tỉnh/TP khác
          </label>
        </div>
      </div>

      <div className="internet-divider" />

      {/* PRICE */}
      <div className="internet-price-section">

        <span className="price-label">
          Đơn giá
        </span>

        <div className="price-display">
          <span className="price-amount">
            {price?.toLocaleString()}
          </span>
          <span className="price-unit">
            đ/tháng
          </span>
        </div>

      </div>

      {/* ACTION */}
      <div className="internet-action-section">

        <button className="internet-btn internet-red-btn">
          Đăng ký
        </button>

        <button className="internet-btn internet-white-btn">
          Chi tiết gói cước
        </button>

      </div>

    </div>
  )
}

export default CardInternet