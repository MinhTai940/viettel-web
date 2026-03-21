import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <nav className={`sidebar ${isMobile ? (sidebarOpen ? "mobile-open" : "") : ""}`}>
                <div className="sidebar-header">
                    <div className="logo">Viettel Admin</div>
                </div>
                <ul className="sidebar-nav">
                    <li>
                        <Link to="/admin/dashboard" className="sidebar-link active">
                            <span className="sidebar-icon">🏠</span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/packages" className="sidebar-link">
                            <span className="sidebar-icon">📦</span>
                            Quản lý gói cước
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/packages/list" className="sidebar-link">
                            <span className="sidebar-icon">📋</span>
                            Danh sách gói
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/internet" className="sidebar-link">
                            <span className="sidebar-icon">🌐</span>
                            Quản lý Internet
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main */}
            <div className={`main-wrapper ${isMobile ? "expanded" : ""}`}>
                <header className="topbar">
                    <div className="topbar-actions">
                        <button className="btn-toggle-sidebar" onClick={toggleSidebar}>
                            {isMobile ? "☰" : "←"}
                        </button>
                        <div className="search-input">
                            <input type="text" placeholder="Tìm kiếm..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%' }} />
                        </div>
                    </div>
                    <div className="user-menu">
                        <span>Admin</span>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e5002b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>A</div>
                    </div>
                </header>
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
