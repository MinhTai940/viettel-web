import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import "./Admin.css"

function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px'
        }}>
            <div className="admin-card" style={{ maxWidth: '420px', width: '100%', backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.95)' }}>
                <div className="card-header text-center mb-6">
                    <div style={{
                        width: 64, height: 64, margin: '0 auto 20px',
                        background: 'linear-gradient(135deg, #e5002b 0%, #ff6b35 100%)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>V</span>
                    </div>
                    <h1 className="card-title" style={{ fontSize: '28px', marginBottom: '8px' }}>Viettel Admin</h1>
                    <p className="card-subtitle" style={{ margin: 0 }}>Đăng nhập để quản lý hệ thống</p>
                </div>

                {error && (
                    <div className="alert alert-error">{error}</div>
                )}

                <div className="form-group">
                    <label className="form-label">Tên đăng nhập</label>
                    <input
                        className="input-field"
                        placeholder="Nhập username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Nhập password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={login}
                    disabled={loading}
                    style={{ width: '100%', justifyContent: 'center' }}
                >
                    {loading ? (
                        <>
                            <div className="spinner"></div>
                            Đang đăng nhập...
                        </>
                    ) : (
                        'Đăng nhập'
                    )}
                </button>

                <div style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280', fontSize: '14px' }}>
                    © 2024 ViettelUp Admin
                </div>
            </div>
        </div>
    )
}

export default Login
