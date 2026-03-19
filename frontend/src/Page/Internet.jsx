// src/components/Internet.jsx
import React from 'react';
import './Internet.css';
import CardInternet from './CardInternet'; 
import Header from '../DashBoard/Header';      // Giữ nguyên đường dẫn Header
import Footer from '../DashBoard/Footer';      // Giữ nguyên đường dẫn Footer
import mockInternetPlans from './mockInternetPlans'; // Giữ nguyên đường dẫn lấy data

const Internet = () => {
  // Gán data từ file mock đã import (giữ nguyên)
  const data = mockInternetPlans;

  return (
    <div className="internet-page-wrapper"> 
      <Header /> 
      
      <main className="internet-container">
        {/* Tiêu đề trang (giữ nguyên) */}
        <h2 className="section-title">Các gói cước Internet Cáp quang</h2>
        
        {/* Đường phân cách dưới tiêu đề trang cho giống Viettelup */}
        <hr className="title-separator" />

        {/* Lưới hiển thị các thẻ Internet (giữ nguyên) */}
        <div className="internet-grid">
          {data && data.length > 0 ? (
            data.map(plan => (
              <CardInternet key={plan.id} plan={plan} /> 
            ))
          ) : (
            <p>Đang tải dữ liệu hoặc không có gói cước nào...</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Internet;