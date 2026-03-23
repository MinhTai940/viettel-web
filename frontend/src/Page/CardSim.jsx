import React, { useState, useEffect } from 'react';
import './CardSim.css';
import API from '../services/api';

const CardSim = ({ stt, soSim }) => {
  const [contactConfig, setContactConfig] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const serverUrl = API.defaults.baseURL.replace('/api', '');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await API.get('/contact');
        // Cũng phải lọc kỹ lấy data thật giống Admin
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        if (data) setContactConfig(data);
      } catch (error) {
        console.error("Chưa lấy được cấu hình liên hệ:", error);
      }
    };
    fetchConfig();
  }, []);

  const handleContactClick = () => {
    if (!contactConfig || !contactConfig.zaloPhone) {
      alert("Hệ thống đang cập nhật thông tin liên hệ. Quý khách vui lòng thử lại sau!");
      return;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      let phoneObj = contactConfig.zaloPhone.trim();
      if (phoneObj.startsWith('0')) {
        phoneObj = '84' + phoneObj.substring(1);
      }
      window.open(`https://zalo.me/${phoneObj}`, '_blank');
    } else {
      setShowQRModal(true);
    }
  };

  return (
    <>
      <div className="sim-card">
        <div className="card-top">
          <div className="badge-5g-corner">
            <span className="badge-text">5G</span>
            <svg viewBox="0 0 24 24" className="badge-wifi" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <div className="card-center">
          <div className="center-5g-logo">
            <span className="center-text">5G</span>
            <svg viewBox="0 0 24 24" className="center-wifi" fill="none" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="#e5002b" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="#e5002b" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="#e5002b" />
            </svg>
          </div>
        </div>

        <div className="card-bottom">
          <div className="sim-info-group">
            <div className="sim-info">
              <span className="label">STT</span><br/>
              <span className="value">{stt}</span>
            </div>
            <div className="sim-info">
              <span className="label">Số SIM</span><br/>
              <span className="value">{soSim}</span>
            </div>
          </div>
          <button className="contact-btn" onClick={handleContactClick}>LIÊN HỆ</button>
        </div>
      </div>

      {showQRModal && contactConfig && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '40px 35px', 
            borderRadius: '16px', 
            width: '100%',
            maxWidth: '380px', 
            textAlign: 'center', 
            position: 'relative', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            
            <button 
              onClick={() => setShowQRModal(false)} 
              style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '12px', 
                fontSize: '28px', 
                cursor: 'pointer', 
                color: '#999', 
                background: 'transparent', 
                border: 'none', 
                fontWeight: 'bold',
                padding: '0 8px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#e5002b'}
              onMouseLeave={(e) => e.target.style.color = '#999'}
            >
              ✕
            </button>
            
            <h2 style={{ 
              color: '#e5002b', 
              marginTop: '5px', 
              marginBottom: '20px', 
              fontSize: '24px',
              fontWeight: '700'
            }}>Quét mã QR Zalo</h2>
            
            <p style={{ 
              color: '#666', 
              marginBottom: '20px', 
              fontSize: '15px',
              fontWeight: '500'
            }}>
              Để mua SIM vui lòng liên hệ
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              {contactConfig.qrCodeUrl ? (
                <div style={{ 
                  background: '#f5f5f5', 
                  padding: '15px', 
                  borderRadius: '12px', 
                  border: '2px solid #e5002b',
                  display: 'inline-block'
                }}>
                  <img 
                    src={`${serverUrl}${contactConfig.qrCodeUrl}`} 
                    alt="Zalo QR" 
                    style={{ 
                      width: '220px', 
                      height: '220px', 
                      objectFit: 'contain',
                      display: 'block'
                    }} 
                  />
                </div>
              ) : (
                <div style={{ 
                  width: '220px', 
                  height: '220px', 
                  background: '#f5f5f5', 
                  margin: '0 auto', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#999', 
                  borderRadius: '12px', 
                  border: '2px dashed #ddd',
                  fontSize: '14px'
                }}>
                  Chưa cập nhật mã QR
                </div>
              )}
            </div>
            <div style={{ 
              marginBottom: '20px', 
              padding: '16px', 
              background: '#f8f8f8', 
              borderRadius: '10px',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ 
                fontSize: '13px', 
                color: '#777', 
                marginBottom: '8px'
              }}>
                Hỗ trợ viên:
              </div>
              <div style={{
                fontSize: '16px',
                color: '#333',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                {contactConfig.zaloName}
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#777',
                marginBottom: '5px'
              }}>
                Số điện thoại:
              </div>
              <div style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#e5002b'
              }}>
                {contactConfig.zaloPhone}
              </div>
            </div>
            
            <p style={{ 
              fontSize: '12px', 
              color: '#999', 
              marginTop: '15px', 
              fontStyle: 'italic',
              marginBottom: '0'
            }}>
              👉 Mở ứng dụng Zalo để quét mã
            </p>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default CardSim;