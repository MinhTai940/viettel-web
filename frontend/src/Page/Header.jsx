import { useEffect, useState } from "react"
import API from "../services/api"

function Header() {

    const [categories, setCategories] = useState([])
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const res = await API.get("/categories")
        setCategories(res.data)
    }

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 80px",
                borderBottom: "1px solid #eee",
                background: "white",
                position: "sticky",
                top: 0,
                zIndex: 1000
            }}
        >

            {/* Logo */}
            <h2 style={{ color: "#e60023" }}>viettel</h2>

            {/* Menu */}

            <div style={{ display: "flex", gap: 40, position: "relative" }}>

                <span style={{ color: "red" }}>
                    Trang chủ
                </span>

                {/* Internet dropdown */}

                <div style={{ position: "relative" }}>

                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        Internet ▼
                    </span>

                    {showMenu && (

                        <div
                            style={{
                                position: "absolute",
                                top: 30,
                                right: 0,
                                background: "white",
                                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                                padding: 10,
                                minWidth: 180
                            }}
                        >

                            {categories.map(c => (

                                <div
                                    key={c._id}
                                    style={{
                                        padding: "10px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {c.name}
                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    )

}

export default Header