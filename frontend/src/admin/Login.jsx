import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameFocus, setUsernameFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const login = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await API.post("/auth/login", {
                username,
                password
            })

            if (res.data) {
                localStorage.setItem("admin", "true")
                navigate("/admin/dashboard")
            }
        } catch (err) {
            setError("Sai tài khoản hoặc mật khẩu")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") login()
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(-45deg, #e5002b, #ff6b35, #f7931e, #00a651, #667eea, #764ba2)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite',
            padding: '20px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        },
        card: {
            maxWidth: '440px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(40px)',
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: '0 25px 45px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
        },
        cardBefore: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #e5002b, #ff6b35, #00a651)',
            transform: 'scaleX(0)',
            transition: 'transform 0.6s ease'
        },
        logo: {
            width: 72,
            height: 72,
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #e5002b 0%, #ff1744 50%, #ff6b35 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 32px rgba(229,0,43,0.4)',
            transition: 'all 0.4s ease',
            cursor: 'default'
        },
        logoText: {
            fontSize: '32px',
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
        },
        title: {
            fontSize: '32px',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #1f2937, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
        },
        subtitle: {
            margin: 0,
            color: '#9ca3af',
            fontSize: '16px'
        },
        error: {
            background: 'linear-gradient(90deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
            animation: 'shake 0.5s ease-in-out',
            border: '1px solid rgba(255,255,255,0.2)'
        },
        formGroup: {
            position: 'relative',
            marginBottom: '28px'
        },
        label: {
            position: 'absolute',
            top: '18px',
            left: '16px',
            color: '#6b7280',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            pointerEvents: 'none',
            background: 'rgba(255,255,255,0.8)',
            padding: '0 8px',
            borderRadius: '6px'
        },
        labelFloat: {
            top: '8px',
            fontSize: '13px',
            color: '#e5002b',
            fontWeight: '600'
        },
        input: {
            width: '100%',
            padding: '20px 16px 16px',
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid rgba(229,0,43,0.2)',
            borderRadius: '16px',
            fontSize: '16px',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            outline: 'none',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
        },
        inputFocus: {
            borderColor: '#e5002b',
            boxShadow: '0 0 0 4px rgba(229,0,43,0.1), 0 8px 24px rgba(229,0,43,0.15)',
            transform: 'translateY(-1px)'
        },
        button: {
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(135deg, #e5002b 0%, #ff6b35 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '17px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(229,0,43,0.4)',
            marginBottom: '24px'
        },
        buttonHover: {
            transform: 'translateY(-3px)',
            boxShadow: '0 20px 40px rgba(229,0,43,0.5)'
        },
        buttonDisabled: {
            opacity: 0.7,
            cursor: 'not-allowed',
            transform: 'none !important'
        },
        spinner: {
            width: 20,
            height: 20,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '12px',
            display: 'inline-block'
        },
        footer: {
            textAlign: 'center',
            marginTop: '20px',
            color: '#9ca3af',
            fontSize: '14px'
        }
    }

    return (
        <>
            <style>{`
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-4px); }
                75% { transform: translateX(4px); }
            }
            @keyframes floatIn {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
            <div style={styles.container} onMouseMove={(e) => {
                // Optional: subtle parallax if needed, but skip for simplicity
            }}>
                <div
                    className="admin-card"
                    style={styles.card}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                >
                    <div
                        style={{
                            ...styles.cardBefore,
                            animationDelay: '0.2s'
                        }}
                    />
                    <div style={styles.logo}>
                        <span style={styles.logoText}>V</span>
                    </div>
                    <h1 style={styles.title}>Viettel Admin</h1>
                    <p style={styles.subtitle}>Đăng nhập để quản lý hệ thống Viettel</p>

                    {error && (
                        <div style={styles.error}>{error}</div>
                    )}

                    <div style={styles.formGroup}>
                        <label
                            style={{
                                ...styles.label,
                                ...(usernameFocus || username ? styles.labelFloat : {})
                            }}
                        >
                            👤 Tên đăng nhập
                        </label>
                        <input
                            style={{
                                ...styles.input,
                                ...(usernameFocus || username ? styles.inputFocus : {})
                            }}
                            placeholder=" "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => { if (!username) setUsernameFocus(false) }}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label
                            style={{
                                ...styles.label,
                                ...(passwordFocus || password ? styles.labelFloat : {})
                            }}
                        >
                            🔒 Mật khẩu
                        </label>
                        <input
                            type="password"
                            style={{
                                ...styles.input,
                                ...(passwordFocus || password ? styles.inputFocus : {})
                            }}
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => { if (!password) setPasswordFocus(false) }}
                        />
                    </div>

                    <button
                        style={{
                            ...styles.button,
                            ...(loading ? styles.buttonDisabled : {}),
                            ':hover': styles.buttonHover
                        }}
                        onClick={login}
                        disabled={loading}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-3px)')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {loading ? (
                            <>
                                <div style={styles.spinner}></div>
                                Đang đăng nhập...
                            </>
                        ) : (
                            'Đăng nhập ngay'
                        )}
                    </button>

                    <div style={styles.footer}>
                        © 2024 ViettelUp Admin Panel. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
