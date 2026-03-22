import { useState } from "react"
import "./Internet.css"

const CardInternet = ({ data, isAdmin, onEdit, onDelete }) => {

  const [area, setArea] = useState("tinh")

  const price =
    area === "hn"
      ? Number(data.price_hn)
      : Number(data.price_tinh)

  return (
    <div className="vt-card">

      {/* CONTENT */}
      <div className="vt-content">

        {/* HEADER */}
        <div className="vt-header">
          <div className="vt-name">
            {data.name}
          </div>

          <div className="vt-speed">
            {data.speed}
          </div>
        </div>


        <div className="vt-line" />

        {/* FEATURE */}
        <div className="vt-block">
          <div className="vt-label">Tiện ích</div>
          <div className="vt-value">
            {data.description || "1 Modem Wifi 6"}
          </div>
        </div>

        {/* AREA */}
        <div className="vt-block">
          <div className="vt-label">Khu vực lắp đặt</div>

          <div className="vt-radio">
            <label>
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

        <div className="vt-line" />

        {/* PRICE */}
        <div className="vt-price-box">

          <div className="vt-price-label">ĐƠN GIÁ</div>

          <div className="vt-price">
            {price?.toLocaleString()}đ/tháng
          </div>

          <button className="vt-btn-register">
            ĐĂNG KÝ
          </button>

        </div>

        {/* ADMIN */}
        {isAdmin && (
          <div className="vt-admin">
            <button onClick={() => onEdit(data)}>Sửa</button>
            <button onClick={() => onDelete(data._id)}>Xóa</button>
          </div>
        )}

      </div>

    </div>
  )
}

export default CardInternet