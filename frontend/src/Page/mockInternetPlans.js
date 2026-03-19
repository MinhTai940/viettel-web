// src/components/mockInternetPlans.js
const mockInternetPlans = [
  {
    id: 1,
    planName: "GIGA1H_GIAITRI",
    speed: "1 Gbps",
    speedIcon: "https://img.icons8.com/material-outlined/24/null/speed.png", // Icon tốc độ placeholder
    priceText: "Giá một tháng",
    price: "340.000",
    priceUnit: "đ/tháng",
    cornerDecoration: "red",
    features: [
      { icon: "https://img.icons8.com/material-outlined/24/null/monitor.png", text: "Thiết bị: 01 thiết bị chuẩn công nghệ mới + Truyền hình trên Smart TV" }, // Icon thiết bị placeholder
      { icon: "https://img.icons8.com/material-outlined/24/null/user.png", text: "Khách hàng tại Nội thành HNI, HCM" }, // Icon khách hàng placeholder
      { icon: "https://img.icons8.com/material-outlined/24/null/gift.png", text: "Tặng 1 tháng cước khi đóng trước 12 tháng" } // Icon tặng placeholder
    ]
  },
  {
    id: 2,
    planName: "GIGA1H_GIAITRIBOX",
    speed: "1 Gbps",
    speedIcon: "https://img.icons8.com/material-outlined/24/null/speed.png",
    priceText: "Giá một tháng",
    price: "360.000",
    priceUnit: "đ/tháng",
    cornerDecoration: "red",
    features: [
      { icon: "https://img.icons8.com/material-outlined/24/null/monitor.png", text: "Thiết bị: 01 thiết bị chuẩn công nghệ mới + Đầu thu Set-top-box TV360" },
      { icon: "https://img.icons8.com/material-outlined/24/null/user.png", text: "Khách hàng tại Nội thành HNI, HCM" },
      { icon: "https://img.icons8.com/material-outlined/24/null/gift.png", text: "Tặng 1 tháng cước khi đóng trước 12 tháng" }
    ]
  },
  {
    id: 3,
    planName: "Gói Phổ Thông",
    speed: "500 Mbps",
    speedIcon: "https://img.icons8.com/material-outlined/24/null/speed.png",
    priceText: "Giá một tháng",
    price: "250.000",
    priceUnit: "đ/tháng",
    cornerDecoration: "orange", // Trang trí góc khác
    features: [
      { icon: "https://img.icons8.com/material-outlined/24/null/monitor.png", text: "Thiết bị: 01 thiết bị chuẩn công nghệ mới" },
      { icon: "https://img.icons8.com/material-outlined/24/null/user.png", text: "Khách hàng tại mọi tỉnh thành" }
    ]
  }
];

export default mockInternetPlans;