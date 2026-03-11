import React, { useEffect, useState } from 'react';
import './Header.css';
import viettelLogo from '../assets/viettel-logo.jpg';
import API from '../services/api';

const Header = () => {

  const [categories, setCategories] = useState([]);

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
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header className="header">

      {/* LOGO */}
      <div
        className="logo-container"
        style={{ cursor: 'pointer' }}
        onClick={scrollToTop}
      >
        <img src={viettelLogo} alt="Viettel Logo" className="logo-img" />
      </div>

      {/* MENU */}
      <nav className="nav-menu">
        <ul className="nav-links">

          {/* Trang chủ */}
          <li>
            <a href="#" onClick={scrollToTop}>Trang chủ</a>
          </li>

          {/* Dropdown gói cước */}
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

            {/* MENU TỰ ĐỘNG TỪ DATABASE */}

            <ul className="dropdown-menu">

              {categories.map((cat) => {

                // tạo id section từ name
                const sectionId = cat.name
                  .toLowerCase()
                  .replace(/\s+/g, '-');

                return (
                  <li key={cat._id}>
                    <a
                      href={`#${sectionId}`}
                      onClick={(e) => scrollToSection(e, sectionId)}
                    >
                      {cat.name}
                    </a>
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