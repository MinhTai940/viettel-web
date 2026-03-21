import React from 'react';
import './CardSim.css';

const CardSim = ({ stt, soSim }) => {
  return (
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
        <button className="contact-btn">LIÊN HỆ</button>
      </div>
    </div>
  );
};

export default CardSim;