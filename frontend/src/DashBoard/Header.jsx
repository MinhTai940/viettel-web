import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom'; // Đã thêm useLocation vào đây
import viettelLogo from '../assets/viettel-logo.jpg';
import API from '../services/api';

const Header = () => {

  const [categories, setCategories] = useState([]);
  const [openParent, setOpenParent] = useState(null);
  
  // Bật "radar" để lấy đường dẫn hiện tại (ví dụ: '/' hoặc '/sim')
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // scroll tới section
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // scroll lên đầu trang
  const scrollToTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleParent = (id) => {
    setOpenParent(openParent === id ? null : id);
  };

  const parentCategories = categories.filter(c => !c.parent);

  return (
    <header className="header">

      {/* LOGO */}
      <div
        className="logo-container"
        style={{ cursor: 'pointer' }}
        onClick={scrollToTop}
      >
        <Link to="/">
          <img src={viettelLogo} alt="Viettel Logo" className="logo-img" />
        </Link>
      </div>

      {/* MENU */}
      <nav className="nav-menu">
        <ul className="nav-links">

          {/* TRANG CHỦ: Sẽ bôi đỏ và in đậm nếu location.pathname === '/' */}
          <li>
            <Link 
              to="/" 
              onClick={scrollToTop}
              style={{ 
                color: location.pathname === '/' ? '#e5002b' : '#333',
                fontWeight: location.pathname === '/' ? 'bold' : 'normal'
              }}
            >
              Trang chủ
            </Link>
          </li>

          {/* SIM: Sẽ bôi đỏ và in đậm nếu location.pathname === '/sim' */}
          <li>
            <Link 
              to="/sim"
              style={{ 
                color: location.pathname === '/sim' ? '#e5002b' : '#333',
                fontWeight: location.pathname === '/sim' ? 'bold' : 'normal'
              }}
            >
              Sim
            </Link>
          </li>

          {/* DROP-DOWN GÓI CƯỚC (Giữ nguyên của mày) */}
          <li className="dropdown">
            <a
              href="#"
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              onClick={(e) => e.preventDefault()}
            >
              Gói cước
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>

            <ul className="dropdown-menu">
              {parentCategories.map(parent => {
                const childCategories = categories.filter(
                  c => c.parent === parent._id
                );

                return (
                  <li key={parent._id}>
                    {/* CLICK CHA */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleParent(parent._id);
                      }}
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      {parent.name}
                      <span>
                        {openParent === parent._id ? "▲" : "▼"}
                      </span>
                    </a>

                    {/* HIỂN THỊ CON */}
                    {openParent === parent._id && (
                      <ul style={{ paddingLeft: 15 }}>
                        {childCategories.map(child => {
                          const childId = child.name
                            .toLowerCase()
                            .replace(/\s+/g, '-');

                          return (
                            <li key={child._id}>
                              <a
                                href={`#${childId}`}
                                onClick={(e) => scrollToSection(e, childId)}
                              >
                                └ {child.name}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>

        </ul>
      </nav>

    </header>
  );
};

export default Header;