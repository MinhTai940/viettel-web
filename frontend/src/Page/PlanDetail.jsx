import React from "react";
import { useParams } from "react-router-dom";
import { monthlyPlans } from "./monthlyData4g.js";
import "./PlanDetail.css";

function PlanDetail() {

  const { id } = useParams();

  const plan = monthlyPlans.find((p) => p.id === parseInt(id));

  if (!plan) {
    return <h2 style={{ padding: "40px" }}>Không tìm thấy gói cước</h2>;
  }

  return (
    <div className="plan-detail-container">

      {/* Tiêu đề */}
      <h1 className="detail-title">
        Gói cước Viettel <span>{plan.planName}</span>
      </h1>

      {/* 3 Box thông tin */}
      <div className="detail-box-container">

        <div className="detail-box">
          <div className="detail-icon">💰</div>
          <div>
            <p>Cước phí</p>
            <h3>{plan.price}</h3>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">⏱</div>
          <div>
            <p>Thời hạn sử dụng</p>
            <h3>1 tháng</h3>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">📶</div>
          <div>
            <p>Dung lượng data 4G tốc độ cao</p>
            <h3>
              {plan.dataValue}
              {plan.dataUnit}/ngày
            </h3>
          </div>
        </div>

      </div>

      {/* Nội dung chi tiết */}
      <div className="detail-content">

        <p>
          {plan.planName} - Gói cước 4G Viettel thông dụng chỉ với{" "}
          <b>{plan.price}</b>, cung cấp{" "}
          <b>
            {plan.dataValue}
            {plan.dataUnit}/ngày
          </b>{" "}
          giúp bạn truy cập internet tốc độ cao trên điện thoại mà không cần wifi.
        </p>

        <h2>Thông tin chi tiết gói cước {plan.planName} của Viettel</h2>

        <ul>
          <li>
            <b>Tên gói cước:</b> {plan.planName}
          </li>
          <li>
            <b>Cước phí:</b> {plan.price}
          </li>
          <li>
            <b>Thời hạn sử dụng:</b> 1 tháng
          </li>
          <li>
            <b>Dung lượng:</b>{" "}
            {plan.dataValue}
            {plan.dataUnit}/ngày
          </li>
          <li>
            <b>Đối tượng áp dụng:</b> Toàn bộ thuê bao Viettel
          </li>
          <li>
            <b>Đăng ký:</b> {plan.planName} gửi 290
          </li>
        </ul>

        {/* Video */}
        <div className="video-container">
          <iframe
            width="100%"
            height="420"
            src="https://www.youtube.com/embed/5ZJpBq8sY4A"
            title="Viettel Package"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Cách đăng ký */}
        <h2>Cách đăng ký gói cước {plan.planName}</h2>

        <p>Soạn tin nhắn theo cú pháp:</p>

        <div className="register-box">
          <b>{plan.planName} gửi 290</b>
        </div>

      </div>
    </div>
  );
}

export default PlanDetail;