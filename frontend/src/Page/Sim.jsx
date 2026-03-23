import React, { useState, useEffect } from 'react';
import './Sim.css';
import Header from '../DashBoard/Header';
import Footer from '../DashBoard/Footer';
import CardSim from './CardSim';
// Nhớ import file API (giống như mày làm ở Header) hoặc import axios nếu xài trực tiếp
import API from '../services/api'; 

const Sim = () => {
  // 1. Khai báo các State cần thiết
  const [activeTab, setActiveTab] = useState('thuong'); // Tab đang chọn
  const [searchTerm, setSearchTerm] = useState('');     // Từ khóa người dùng gõ
  const [simData, setSimData] = useState([]);           // Dữ liệu SIM lấy từ Database

  // 2. Hàm gọi API lấy dữ liệu
  const fetchSims = async () => {
    try {
      // Gọi lên Backend kèm theo 2 biến: loại tab (type) và từ khóa (search)
      const res = await API.get(`/sim?type=${activeTab}&search=${searchTerm}`);
      setSimData(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy SIM:", error);
    }
  };

  // 3. Tự động lấy dữ liệu khi trang vừa load HOẶC khi mày bấm chuyển Tab
  useEffect(() => {
    fetchSims();
    // Chú ý: Cố tình KHÔNG cho searchTerm vào mảng [activeTab] dưới đây
    // Để nó chỉ tìm kiếm khi bấm nút, chứ không vừa gõ vừa tìm gây giật lag server
  }, [activeTab]); 

  // 4. Sự kiện khi bấm nút TÌM KIẾM
  const handleSearchClick = () => {
    fetchSims();
  };

  // 5. Thêm tính năng bấm Enter cũng tìm kiếm cho xịn
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchSims();
    }
  };

  return (
    <div className="sim-page-wrapper">
      <Header />

      <section className="search-section">
        <div className="search-bar">
          
          <div className="search-input-wrapper">
            {/* Gắn State và Sự kiện vào ô Input */}
            <input 
              type="text" 
              className="search-input" 
              placeholder="Tìm số" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Lấy chữ đang gõ
              onKeyDown={handleKeyDown} // Bấm Enter
            />
            
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

          {/* Gắn Sự kiện vào nút TÌM KIẾM */}
          <button className="search-btn" onClick={handleSearchClick}>
            TÌM KIẾM
          </button>
        </div>
      </section>

      <main className="sim-container">
        
        {/* NÚT TABS */}
        <div className="tab-buttons-container">
          <button 
            className={`tab-btn ${activeTab === 'thuong' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('thuong');
              setSearchTerm(''); // Xóa trắng ô tìm kiếm khi chuyển Tab (cho đỡ lú)
            }}
          >
            SIM VIP THƯỜNG
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'dep' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dep');
              setSearchTerm(''); // Xóa trắng ô tìm kiếm khi chuyển Tab
            }}
          >
            SIM VIP ĐẸP
          </button>
        </div>

        {/* KHU VỰC HIỂN THỊ */}
        <div className="sim-tab-content">
          {/* Bây giờ code cực ngắn, vì mảng simData chứa đúng dữ liệu của Tab đó rồi */}
          <div className="cards-grid fade-in-tab" key={activeTab}> {/* Thêm key={activeTab} để nó chạy lại hiệu ứng Fade In khi đổi tab */}
            
            {simData && simData.length > 0 ? (
              simData.map((sim, index) => (
                <CardSim 
                  key={sim._id || index} // Dùng id của MongoDB cho chuẩn
                  stt={sim.stt} 
                  soSim={sim.soSim} 
                />
              ))
            ) : (
              // Báo lỗi nếu không có SIM nào
              <div style={{ textAlign: 'center', width: '100%', color: '#888', gridColumn: 'span 2' }}>
                <p>Không tìm thấy số SIM nào phù hợp. Vui lòng thử lại!</p>
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Sim;