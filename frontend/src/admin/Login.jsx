import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {

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

            alert("Sai tài khoản hoặc mật khẩu")

        }

    }

    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>

            <div style={{ width: 300 }}>

                <h2>Admin Login</h2>

                <input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button onClick={login}>
                    Login
                </button>

            </div>

        </div>

    )

}

export default Login