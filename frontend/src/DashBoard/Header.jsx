import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import viettelLogo from '../assets/viettel-logo.jpg';
import API from '../services/api';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  // Lấy cả danh mục và gói cước để lọc "động" chuẩn xác
  const fetchData = async () => {
    try {
      const [catRes, pkgRes] = await Promise.all([
        API.get("/categories"),
        API.get("/packages")
      ]);
      setCategories(catRes.data);
      setPackages(pkgRes.data);
    } catch (err) {
      console.log("Lỗi tải dữ liệu Header:", err);
    }
  };

  // --- LOGIC LỌC DANH MỤC THÔNG MINH ---

  // 1. Kiểm tra xem danh mục đó có chứa gói cước nào không
  const hasContent = (catId) => {
    return packages.some(p => {
      const pCatId = typeof p.category === 'object' ? p.category?._id : p.category;
      return pCatId === catId;
    });
  };

  // Lấy tất cả danh mục con có gói cước
  const allChildCategories = categories.filter(c => c.parent && hasContent(c._id));

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpenMenu(false); // Đóng menu sau khi chọn
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpenMenu(false);
  };

  return (
    <header className="header">
      {/* 1. LOGO */}
      <div className="logo-container">
        <Link to="/" onClick={scrollToTop}>
          <img src={viettelLogo} alt="Viettel Logo" className="logo-img" />
        </Link>
      </div>

      {/* 2. NÚT TOGGLE MOBILE (3 GẠCH) */}
      <div className="menu-toggle" onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? "✕" : "☰"}
      </div>

      {/* 3. NAVIGATION MENU */}
      <nav className={`nav-menu ${openMenu ? "active" : ""}`}>
        <ul className={`nav-links ${openMenu ? "active" : ""}`}>
          
          <li>
            <Link 
              to="/" 
              onClick={scrollToTop}
              className={location.pathname === '/' ? 'text-red bold' : ''}
            >
              Trang chủ
            </Link>
          </li>

          <li>
            <Link 
              to="/internet" 
              onClick={() => setOpenMenu(false)}
              className={location.pathname === '/internet' ? 'text-red bold' : ''}
            >
              Internet
            </Link>
          </li>

          <li>
            <Link 
              to="/sim" 
              onClick={() => setOpenMenu(false)}
              className={location.pathname === '/sim' ? 'text-red bold' : ''}
            >
              Sim
            </Link>
          </li>

          {/* DROPDOWN GÓI CƯỚC */}
          <li className="dropdown">
            <button type="button" className="menu-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Gói cước
            </button>

            <ul className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
              {allChildCategories.map(child => {
                const childId = child.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "") // Khử dấu tiếng Việt
                  .replace(/\s+/g, '-');

                return (
                  <li key={child._id}>
                    <button
                      type="button"
                      className="child-btn"
                      onClick={() => scrollToSection(childId)}
                    >
                      {child.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;