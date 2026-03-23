import { useState, useEffect } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function AdminLayout() {

    const [open, setOpen] = useState(true)
    const [mobile, setMobile] = useState(false)

    const location = useLocation()

    useEffect(() => {
        const check = () => setMobile(window.innerWidth < 1024)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const toggle = () => setOpen(!open)

    const menu = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "🏠" },
        { name: "Gói cước", path: "/admin/packages", icon: "📦" },
        { name: "Danh sách gói", path: "/admin/packages/list", icon: "📋" },
        { name: "Internet", path: "/admin/internet", icon: "🌐" },
        { name: "SIM", path: "/admin/sim", icon: "📱" }
    ]

    return (
        <div style={styles.container}>

            {/* SIDEBAR */}
            <div style={{
                ...styles.sidebar,
                ...(mobile && !open ? styles.sidebarHide : {})
            }}>

                <div style={styles.logo}>
                    Viettel Admin
                </div>

                {menu.map(m => (
                    <Link
                        key={m.path}
                        to={m.path}
                        style={{
                            ...styles.link,
                            ...(location.pathname === m.path ? styles.active : {})
                        }}
                    >
                        <span style={{ marginRight: 10 }}>{m.icon}</span>
                        {m.name}
                    </Link>
                ))}

            </div>

            {/* MAIN */}
            <div style={styles.main}>

                {/* TOPBAR */}
                <div style={styles.topbar}>

                    <button style={styles.menuBtn} onClick={toggle}>
                        ☰
                    </button>

                    <input
                        placeholder="Tìm kiếm..."
                        style={styles.search}
                    />

                    <div style={styles.user}>
                        Admin
                    </div>

                </div>

                {/* CONTENT */}
                <div style={styles.content}>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

/* ================= STYLE ================= */

const styles = {

    container: {
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6f8",
        fontFamily: "Arial"
    },

    sidebar: {
        width: 240,
        background: "#111827",
        color: "white",
        padding: 20,
        transition: ".3s"
    },

    sidebarHide: {
        marginLeft: -240
    },

    logo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#ff3b3b"
    },

    link: {
        display: "block",
        padding: "12px 14px",
        borderRadius: 8,
        color: "#cbd5e1",
        textDecoration: "none",
        marginBottom: 6
    },

    active: {
        background: "#e11d48",
        color: "white",
        fontWeight: 600
    },

    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },

    topbar: {
        height: 60,
        background: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
    },

    menuBtn: {
        fontSize: 20,
        border: 0,
        background: "transparent",
        cursor: "pointer",
        marginRight: 20
    },

    search: {
        flex: 1,
        padding: 8,
        borderRadius: 6,
        border: "1px solid #ddd"
    },

    user: {
        marginLeft: 20,
        fontWeight: 600
    },

    content: {
        padding: 25
    }
}