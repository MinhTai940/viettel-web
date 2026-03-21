import { useEffect, useState } from "react"
import API from "../services/api"
import CardInternet from "../Page/CardInternet"

function AdminInternet() {

    const [tab, setTab] = useState("package")

    // ===== CATEGORY INTERNET =====
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")

    // ===== PACKAGE INTERNET =====
    const [list, setList] = useState([])

    const [form, setForm] = useState({
        name: "",
        speed: "",
        price: "",
        category: "",
        description: "",
        price_hn: "",
        price_tinh: "",
    })

    useEffect(() => {
        loadAll()
    }, [])

    const loadAll = async () => {

        // ⭐ LOAD CATEGORY INTERNET
        const cat = await API.get("/internet-category")

        // ⭐ LOAD PACKAGE INTERNET
        const pkg = await API.get("/internet")

        setCategories(cat.data)
        setList(pkg.data)
    }

    // ================= CREATE CATEGORY =================
    const createCategory = async () => {

        if (!categoryName.trim()) {
            alert("Nhập tên danh mục Internet")
            return
        }

        await API.post("/internet-category", {
            name: categoryName
        })

        alert("✅ Tạo danh mục Internet thành công")

        setCategoryName("")
        loadAll()
    }

    // ================= CREATE PACKAGE =================
    const createPackage = async () => {

        if (!form.name || !form.price || !form.category) {
            alert("Nhập thiếu thông tin")
            return
        }

        await API.post("/internet", {
            name: form.name,
            speed: form.speed,
            price: Number(form.price),
            category: form.category,
            description: form.description,
            price_hn: Number(form.price_hn),
            price_tinh: Number(form.price_tinh)
        })

        alert("✅ Tạo gói Internet thành công")

        setForm({
            name: "",
            speed: "",
            price: "",
            category: "",
            description: ""
        })

        loadAll()
    }

    return (
        <div style={{ padding: 30 }}>

            <h2>🌐 Quản lý Internet lắp đặt</h2>

            {/* ===== TAB ===== */}
            <div style={{ marginBottom: 20 }}>
                <button onClick={() => setTab("package")}>
                    Tạo gói
                </button>

                <button
                    onClick={() => setTab("category")}
                    style={{ marginLeft: 10 }}
                >
                    Tạo danh mục
                </button>
            </div>


            {/* ================= CATEGORY ================= */}
            {tab === "category" && (
                <div>

                    <h3>Tạo danh mục Internet</h3>

                    <input
                        placeholder="Tên danh mục"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />

                    <button onClick={createCategory}>
                        Tạo
                    </button>

                    <hr />

                    <h3>Danh sách danh mục</h3>

                    {categories.map(c => (
                        <div key={c._id}>
                            📁 {c.name}
                        </div>
                    ))}

                </div>
            )}

            {/* ================= PACKAGE ================= */}
            {tab === "package" && (
                <div>

                    <h3>Tạo gói Internet</h3>

                    <input
                        placeholder="Tên gói"
                        value={form.name}
                        onChange={e =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Tốc độ (300Mbps)"
                        value={form.speed}
                        onChange={e =>
                            setForm({ ...form, speed: e.target.value })
                        }
                    />

                    <input
                        placeholder="Giá"
                        value={form.price}
                        onChange={e =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                    <input
                        placeholder="Giá HN / HCM"
                        value={form.price_hn}
                        onChange={e =>
                            setForm({ ...form, price_hn: e.target.value })
                        }
                    />

                    <input
                        placeholder="Giá Tỉnh"
                        value={form.price_tinh}
                        onChange={e =>
                            setForm({ ...form, price_tinh: e.target.value })
                        }
                    />

                    <select
                        value={form.category}
                        onChange={e =>
                            setForm({ ...form, category: e.target.value })
                        }
                    >
                        <option value="">Chọn danh mục Internet</option>

                        {categories.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <input
                        placeholder="Mô tả"
                        value={form.description}
                        onChange={e =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <button onClick={createPackage}>
                        Tạo gói
                    </button>

                    <hr />

                    <h3>Danh sách gói Internet</h3>

                    <div style={{
                        display: "flex",
                        gap: 20,
                        flexWrap: "wrap",
                        marginTop: 20
                    }}>
                        {list.map(p => (
                            <CardInternet key={p._id} data={p} />
                        ))}
                    </div>

                </div>
            )}

        </div>
    )
}

export default AdminInternet