import React, { useState } from 'react';
import './Header.css';
import viettelLogo from '../assets/viettel-logo.jpg'; 

const Header = () => {
  // Hàm cuộn mượt mà đến đúng ID gói cước
  const scrollToSection = (e, id) => {
    e.preventDefault(); // Chặn việc nó nhảy trang 
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hàm cuộn mượt lên đầu trang khi bấm Trang chủ / Logo
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      
      {/* CỘT TRÁI: LOGO */}
      <div className="logo-container" style={{ cursor: 'pointer' }} onClick={scrollToTop}>
        <img src={viettelLogo} alt="Viettel Logo" className="logo-img" />
      </div>

      {/* CỘT GIỮA: THANH MENU */}
      <nav className="nav-menu">
        <ul className="nav-links">
          
          {/* Nút Trang chủ */}
          <li>
            <a href="#" onClick={scrollToTop}>Trang chủ</a>
          </li>

          {/* Cụm Dropdown Gói Cước */}
          <li className="dropdown">
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={(e) => e.preventDefault()}>
              Gói cước
              {/* Icon mũi tên chỉ xuống */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            
            {/* Menu con thả xuống (CSS của mày tự động hiện khi hover) */}
            <ul className="dropdown-menu">
              <li>
                <a href="#goi-thang" onClick={(e) => scrollToSection(e, 'goi-thang')}>Gói cước tháng</a>
              </li>
              <li>
                <a href="#goi-ngay" onClick={(e) => scrollToSection(e, 'goi-ngay')}>Gói cước ngày</a>
              </li>
              <li>
                <a href="#goi-khac" onClick={(e) => scrollToSection(e, 'goi-khac')}>Gói cước khác</a>
              </li>
            </ul>
          </li>

        </ul>
      </nav>

    </header>
  );
};

export default Header;