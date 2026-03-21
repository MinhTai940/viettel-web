import React, { useState } from 'react';
import './Sim.css';
import Header from '../DashBoard/Header';
import Footer from '../DashBoard/Footer';
import CardSim from './CardSim';

const Sim = () => {
  // Đặt mặc định là 'thuong'
  const [activeTab, setActiveTab] = useState('thuong');

  // Dữ liệu test
  const simThuongData = [
    { stt: '001', soSim: '098x.xxx.xxx' },
    { stt: '002', soSim: '097x.xxx.xxx' },
  ];

  const simDepData = [
    { stt: '001', soSim: '099x.xxx.xxx' },
    { stt: '002', soSim: '088x.xxx.xxx' },
  ];

  return (
    <div className="sim-page-wrapper">
      <Header />

      <section className="search-section">
        <div className="search-bar">
          {/* <div className="search-label">TÌM SỐ</div> */}
          
          {/* BỌC INPUT VÀ BẢNG HƯỚNG DẪN VÀO CHUNG 1 CỤM */}
          <div className="search-input-wrapper">
            <input type="text" className="search-input" placeholder="Tìm số" />
            
            {/* ĐÂY LÀ CÁI BẢNG HƯỚNG DẪN ẨN */}
            <div className="search-tooltip">
              <h4>Hướng dẫn tìm số</h4>
              <ul>
                <li>- Để tìm sim bắt đầu bằng 098, quý khách nhập vào 098*</li>
                <li>- Để tìm sim kết thúc bằng 888, quý khách nhập *888</li>
                <li>- Để tìm sim bắt đầu 098 và kết thúc bằng 888, quý khách nhập vào 098*888</li>
                <li>- Để tìm sim bên trong có số 888, quý khách nhập vào 888</li>
              </ul>
            </div>
          </div>

          <button className="search-btn">TÌM KIẾM</button>
        </div>
      </section>

      <main className="sim-container">
        
        {/* NÚT TABS */}
        <div className="tab-buttons-container">
          <button 
            className={`tab-btn ${activeTab === 'thuong' ? 'active' : ''}`}
            onClick={() => setActiveTab('thuong')}
          >
            SIM VIP THƯỜNG
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'dep' ? 'active' : ''}`}
            onClick={() => setActiveTab('dep')}
          >
            SIM VIP ĐẸP
          </button>
        </div>

        {/* KHU VỰC HIỂN THỊ */}
        <div className="sim-tab-content">
          
          {/* NẾU LÀ THƯỜNG */}
          {activeTab === 'thuong' && (
            // GẮN THÊM fade-in-tab VÀO ĐÂY NÈ
            <div className="cards-grid fade-in-tab">
              {simThuongData.map((sim, index) => (
                <CardSim key={index} stt={sim.stt} soSim={sim.soSim} />
              ))}
            </div>
          )}

          {/* NẾU LÀ ĐẸP */}
          {activeTab === 'dep' && (
            // GẮN THÊM fade-in-tab VÀO ĐÂY NỮA LÀ XONG
            <div className="cards-grid fade-in-tab">
              {simDepData.map((sim, index) => (
                <CardSim key={index} stt={sim.stt} soSim={sim.soSim} />
              ))}
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Sim;