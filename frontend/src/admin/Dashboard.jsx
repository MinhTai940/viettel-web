import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../services/api'; 
import './Dashboard.css';

const Dashboard = () => {
  // 1. Các State để lưu dữ liệu THẬT
  const [visitorData, setVisitorData] = useState([]);
  const [dbSummary, setDbSummary] = useState({
    totalPackages: 0,
    newCustomers: 0,
    topPackages: []
  });
  const [todayVisits, setTodayVisits] = useState(0); // Lượt truy cập hôm nay
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Gọi song song 2 API: 1 từ GA4, 1 từ Database của mày
      const [gaRes, dbRes] = await Promise.all([
        API.get('/analytics/visitors'), // API Google Analytics 
        API.get('/admin/summary')       // API Database (tổng gói, top gói)
      ]);

      const analyticsData = gaRes.data;
      setVisitorData(analyticsData);

      // Lấy số truy cập của ngày cuối cùng (Hôm nay) từ GA4
      if (analyticsData && analyticsData.length > 0) {
        setTodayVisits(analyticsData[analyticsData.length - 1].users);
      }

      // Lưu dữ liệu thật từ Database
      setDbSummary(dbRes.data);

    } catch (err) {
      console.error("Lỗi tải dữ liệu Dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Quản trị hệ thống Viettel</h1>
        <p>Số liệu được cập nhật trực tiếp (Real-time) từ hệ thống.</p>
      </header>

      {/* 1. Metric Cards - SỐ LIỆU THẬT */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-title">Truy cập hôm nay (GA4)</span>
          <div className="metric-value" style={{ color: '#ee0033' }}>
            {loading ? "..." : todayVisits}
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-title">Khách đăng ký mới (Hôm nay)</span>
          <div className="metric-value" style={{ color: '#28a745' }}>
            {loading ? "..." : dbSummary.newCustomers}
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-title">Tổng gói cước (Database)</span>
          <div className="metric-value" style={{ color: '#17a2b8' }}>
            {loading ? "..." : dbSummary.totalPackages}
          </div>
        </div>
      </div>

      {/* 2. Biểu đồ Analytics */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>Thống kê lượt truy cập (7 ngày qua)</h3>
          <button onClick={fetchAllData} className="refresh-btn">Làm mới data</button>
        </div>
        
        <div className="chart-wrapper">
          {loading ? (
            <div className="loading-spinner">Đang đồng bộ dữ liệu...</div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ee0033" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ee0033" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#888'}} dy={10}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888'}} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#ee0033" strokeWidth={3} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 3. Bảng Top Gói Cước - DỮ LIỆU THẬT */}
      <div className="table-section">
        <h3>Gói cước được quan tâm nhiều nhất</h3>
        {loading ? (
          <p>Đang tải danh sách...</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Tên gói cước</th>
                <th>Giá (VNĐ)</th>
                <th>Lượt xem thực tế</th>
              </tr>
            </thead>
            <tbody>
              {dbSummary.topPackages.map((pkg, index) => (
                <tr key={pkg._id || index}>
                  <td style={{ fontWeight: 'bold' }}>{pkg.name}</td>
                  <td>{pkg.price ? pkg.price.toLocaleString() + ' đ' : 'Liên hệ'}</td>
                  <td style={{ color: '#ee0033', fontWeight: 'bold' }}>
                    {pkg.views || 0}
                  </td>
                </tr>
              ))}
              
              {dbSummary.topPackages.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>Chưa có dữ liệu lượt xem</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;