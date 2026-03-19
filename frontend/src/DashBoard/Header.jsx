import React, { useEffect, useState } from 'react';
import './Header.css';
import viettelLogo from '../assets/viettel-logo.jpg';
import API from '../services/api';

const Header = () => {

  const [categories, setCategories] = useState([]);
  const [openParent, setOpenParent] = useState(null);

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
        <img src={viettelLogo} alt="Viettel Logo" className="logo-img" />
      </div>

      {/* MENU */}
      <nav className="nav-menu">
        <ul className="nav-links">

          <li>
            <a href="#" onClick={scrollToTop}>Trang chủ</a>
          </li>

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

                const parentId = parent.name
                  .toLowerCase()
                  .replace(/\s+/g, '-');

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