import React, { useState } from 'react'; 
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import PlanCard from '../Page/PlanCard';
import { monthlyPlans as monthlyPlans5G } from '../Page/monthlyData5g';
import { monthlyPlans as monthlyPlans4G } from '../Page/monthlyData4g';
import { dayPlans as dayMxhAddOn } from '../Page/dayMxhAddOn';

const DashBoard = () => {
  // Tạo 3 công tắc riêng biệt cho 3 mục lớn (Tháng mặc định mở, Ngày và Khác mặc định đóng)
  const [isOpenThang, setIsOpenThang] = useState(true); 
  const [isOpenNgay, setIsOpenNgay] = useState(true); 
  const [isOpenKhac, setIsOpenKhac] = useState(true); 

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'sans-serif' }}>
      <Header />
      <Banner />
      
      <div style={{ maxWidth: '1250px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* ========================================================= */}
        {/* 1. MỤC GÓI CƯỚC THÁNG */}
        {/* ========================================================= */}
        <div id="goi-thang" style={{ marginBottom: '20px' }}>
          {/* Header của mục Tháng (Chứa tiêu đề lớn và Nút bấm) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', margin: 0 }}>
              Gói cước tháng
            </h2>
            <button 
              type="button" onClick={() => setIsOpenThang(!isOpenThang)} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#333', padding: 0, flexShrink: 0 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.4s ease', transform: isOpenThang ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>

          {/* Nội dung bên trong mục Tháng (Trượt mượt mà) */}
          <div style={{ display: 'grid', gridTemplateRows: isOpenThang ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease-in-out' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ paddingTop: '10px', paddingBottom: '30px' }}>
                
                {/* --- Nhóm con: DATA 5G --- */}
                <h3 style={{ fontSize: '16px', fontWeight: 'normal', color: '#666', marginBottom: '20px', textTransform: 'uppercase' }}>Gói cước Data 5G</h3>
                <div style={{ display: 'flex', gap: '60px 20px', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: '50px' }}>
                  {monthlyPlans5G && monthlyPlans5G.map((plan) => (
                    <PlanCard key={`5g-${plan.id}`} {...plan} />
                    ))}
                </div>

                {/* --- Nhóm con: DATA 4G --- */}
                <h3 style={{ fontSize: '16px', fontWeight: 'normal', color: '#666', marginBottom: '20px', textTransform: 'uppercase' }}>Gói cước Data 4G</h3>
                <div style={{ display: 'flex', gap: '60px 20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  {monthlyPlans4G && monthlyPlans4G.map((plan) => (
                    <PlanCard key={`4g-${plan.id}`} {...plan} />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Cạch ngang ngăn cách giữa các nhóm lớn (tuỳ chọn cho đẹp) */}
        <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '30px 0' }} />

       {/* ========================================================= */}
        {/* 2. MỤC GÓI CƯỚC NGÀY */}
        {/* ========================================================= */}
        <div id="goi-ngay" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', margin: 0 }}>
              Gói cước ngày
            </h2>
            <button 
              type="button" onClick={() => setIsOpenNgay(!isOpenNgay)} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#333', padding: 0, flexShrink: 0 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.4s ease', transform: isOpenNgay ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: isOpenNgay ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease-in-out' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ paddingTop: '10px', paddingBottom: '30px' }}>
                
                {/* LỖI Ở ĐÂY NÈ: Mày thiếu nguyên cái thẻ div flex này! Tao thêm vào rồi đó */}
                <div style={{ display: 'flex', gap: '60px 20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  
                  {dayMxhAddOn && dayMxhAddOn.map((plan) => (
                    <PlanCard key={`mxhAddOn-${plan.id}`} {...plan} />
                  ))}
                  
                </div>

              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '30px 0' }} />

        {/* ========================================================= */}
        {/* 3. MỤC GÓI CƯỚC KHÁC (Làm khung sẵn) */}
        {/* ========================================================= */}
        <div id="goi-khac" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', margin: 0 }}>
              Gói cước khác
            </h2>
            <button 
              type="button" onClick={() => setIsOpenKhac(!isOpenKhac)} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#333', padding: 0, flexShrink: 0 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.4s ease', transform: isOpenKhac ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: isOpenKhac ? '1fr' : '0fr', transition: 'grid-template-rows 0.4s ease-in-out' }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ paddingTop: '10px', paddingBottom: '30px', color: '#888' }}>
                {/* Sau này mày gọi Data gói Khác vào đây */}
                (Nội dung các gói cước khác sẽ hiển thị ở đây...)
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;