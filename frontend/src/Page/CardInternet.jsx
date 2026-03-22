import { useState } from "react"
import "./Internet.css"
import { useNavigate } from "react-router-dom"

const CardInternet = ({ data, isAdmin, onEdit, onDelete }) => {

  const navigate = useNavigate()

  const [area, setArea] = useState("tinh")

  const price =
    area === "hn"
      ? Number(data.price_hn)
      : Number(data.price_tinh)

  return (
    <div
      className="vt-card"
      onClick={() => navigate("/internet/" + data._id)}
      style={{ cursor: "pointer" }}
    >

      <div className="vt-content">

        {/* HEADER */}
        <div className="vt-header">
          <div className="vt-name">{data.name}</div>
          <div className="vt-speed">{data.speed}</div>
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

            <label onClick={(e) => e.stopPropagation()}>
              <input
                type="radio"
                checked={area === "hn"}
                onChange={(e) => {
                  e.stopPropagation()
                  setArea("hn")
                }}
              />
              HN & TP.HCM
            </label>

            <label onClick={(e) => e.stopPropagation()}>
              <input
                type="radio"
                checked={area === "tinh"}
                onChange={(e) => {
                  e.stopPropagation()
                  setArea("tinh")
                }}
              />
              Tỉnh/TP khác
            </label>

          </div>
        </div>

        <div className="vt-line" />

        {/* PRICE */}
        <div
          className="vt-price-box"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="vt-price-label">ĐƠN GIÁ</div>

          <div className="vt-price">
            {price?.toLocaleString()}đ/tháng
          </div>

          <button
            className="vt-btn-register"
            onClick={(e) => {
              e.stopPropagation()

              alert("Đăng ký gói " + data.name)
            }}
          >
            ĐĂNG KÝ
          </button>

        </div>

        {/* ADMIN */}
        {isAdmin && (
          <div
            className="vt-admin"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(data)
              }}
            >
              Sửa
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(data._id)
              }}
            >
              Xóa
            </button>
          </div>
        )}

      </div>

    </div>
  )
}

export default CardInternet