import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import viettelLogo from '../assets/viettel-logo.jpg'
import API from '../services/api'

const Header = () => {

  const [categories, setCategories] = useState([])
  const [openParent, setOpenParent] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)

  const location = useLocation()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories")
      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleParent = (id) => {
    setOpenParent(openParent === id ? null : id)
  }

  const parentCategories = categories.filter(c => !c.parent)

  return (
    <header className="header">

      {/* LOGO */}
      <div className="logo-container" style={{ cursor: 'pointer' }}>
        <Link to="/" onClick={scrollToTop}>
          <img src={viettelLogo} alt="Viettel Logo" className="logo-img" />
        </Link>
      </div>
      <div className="menu-toggle" onClick={() => setOpenMenu(!openMenu)}>
        ☰
      </div>

      {/* MENU */}
      <nav className="nav-menu">
        <ul className={`nav-links ${openMenu ? "active" : ""}`}>

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

          <li>
            <Link
              to="/internet"
              style={{
                color: location.pathname === '/internet' ? '#e5002b' : '#333',
                fontWeight: location.pathname === '/internet' ? 'bold' : 'normal'
              }}
            >
              Internet
            </Link>
          </li>

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

          {/* DROPDOWN */}
          <li className="dropdown">

            <button
              type="button"
              className="menu-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
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
            </button>

            <ul className="dropdown-menu">
              {parentCategories.map(parent => {

                const childCategories = categories.filter(
                  c => c.parent === parent._id
                )

                return (
                  <li key={parent._id}>

                    <button
                      type="button"
                      onClick={() => toggleParent(parent._id)}
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        background: "none",
                        border: "none",
                        width: "100%",
                        cursor: "pointer"
                      }}
                    >
                      {parent.name}
                      <span>
                        {openParent === parent._id ? "▲" : "▼"}
                      </span>
                    </button>

                    {openParent === parent._id && (
                      <ul style={{ paddingLeft: 15 }}>
                        {childCategories.map(child => {

                          const childId = child.name
                            .toLowerCase()
                            .replace(/\s+/g, '-')

                          return (
                            <li key={child._id}>
                              <button
                                type="button"
                                onClick={() => scrollToSection(childId)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer"
                                }}
                              >
                                └ {child.name}
                              </button>
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
  )
}

export default Header