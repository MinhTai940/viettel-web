import { useEffect, useState } from "react"
import API from "../services/api"
import CardInternet from "../Page/CardInternet"

export default function AdminInternet() {

    const [list, setList] = useState([])
    const [categories, setCategories] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [tab, setTab] = useState("package")
    const [cateName, setCateName] = useState("")

    const [form, setForm] = useState({
        name: "",
        speed: "",
        price_hn: "",
        price_tinh: "",
        category: "",
        description: ""
    })

    useEffect(() => {
        loadData()
    }, [])

    const createCategory = async () => {
        if (!cateName) {
            alert("Nhập tên danh mục")
            return
        }

        await API.post("/internet-category", {
            name: cateName
        })

        setCateName("")
        loadData()
        alert("Đã tạo danh mục")
    }

    const loadData = async () => {
        const res = await API.get("/internet")
        setList(res.data)

        const cate = await API.get("/internet-category")
        setCategories(cate.data)
    }

    const submit = async () => {

        if (
            !form.name ||
            !form.speed ||
            !form.price_hn ||
            !form.price_tinh
        ) {
            alert("Nhập thiếu thông tin")
            return
        }

        const payload = {
            ...form,
            price_hn: Number(form.price_hn),
            price_tinh: Number(form.price_tinh)
        }

        if (editingId) {
            await API.put("/internet/" + editingId, payload)
            setEditingId(null)
        } else {
            await API.post("/internet", payload)
        }

        setForm({
            name: "",
            speed: "",
            price_hn: "",
            price_tinh: "",
            category: "",
            description: ""
        })

        loadData()
    }

    const edit = (p) => {
        setEditingId(p._id)

        setForm({
            name: p.name,
            speed: p.speed,
            price_hn: p.price_hn,
            price_tinh: p.price_tinh,
            category: p.category?._id,
            description: p.description
        })
    }

    const remove = async (id) => {
        if (!window.confirm("Xóa gói ?")) return
        await API.delete("/internet/" + id)
        loadData()
    }
    const groupByCategory = () => {

        const map = {}

        list.forEach(pkg => {   // ⭐ sửa packages → list

            const cateName =
                pkg.category?.name || "Chưa phân loại"

            if (!map[cateName]) {
                map[cateName] = []
            }

            map[cateName].push(pkg)

        })

        return map
    }
    const grouped = groupByCategory()

    return (
        <div style={{ padding: 20 }}>

            <h2>🌐 Quản lý Internet lắp đặt</h2>
            <div style={{ marginBottom: 20 }}>
                <button
                    onClick={() => setTab("package")}
                    style={{
                        background: tab === "package" ? "red" : "#ddd",
                        color: tab === "package" ? "#fff" : "#000",
                        marginRight: 10
                    }}
                >
                    Tạo gói Internet
                </button>

                <button
                    onClick={() => setTab("category")}
                    style={{
                        background: tab === "category" ? "red" : "#ddd",
                        color: tab === "category" ? "#fff" : "#000"
                    }}
                >
                    Tạo danh mục
                </button>
            </div>

            {/* FORM */}
            {tab === "package" && (
                <div style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 20
                }}>

                    <input
                        placeholder="Tên gói"
                        value={form.name}
                        onChange={e =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Tốc độ (300 Mbps)"
                        value={form.speed}
                        onChange={e =>
                            setForm({ ...form, speed: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Giá HN"
                        value={form.price_hn}
                        onChange={e =>
                            setForm({
                                ...form,
                                price_hn: e.target.value.replace(/\D/g, "")
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Giá tỉnh"
                        value={form.price_tinh}
                        onChange={e =>
                            setForm({
                                ...form,
                                price_tinh: e.target.value.replace(/\D/g, "")
                            })
                        }
                    />

                    <select
                        value={form.category}
                        onChange={e =>
                            setForm({ ...form, category: e.target.value })
                        }
                    >
                        <option value="">Chọn danh mục</option>
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

                    <button onClick={submit}>
                        {editingId ? "Cập nhật" : "Tạo gói"}
                    </button>

                </div>
            )}
            {tab === "category" && (
                <div style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 8,
                    width: 400,
                    marginBottom: 20
                }}>
                    <h3>Tạo danh mục Internet</h3>

                    <input
                        placeholder="Tên danh mục"
                        value={cateName}
                        onChange={e => setCateName(e.target.value)}
                        style={{ width: "100%", marginBottom: 10 }}
                    />

                    <button onClick={createCategory}>
                        Lưu danh mục
                    </button>
                </div>
            )}

            {/* PREVIEW CARD */}
            {form.name && (
                <>
                    <h3>Xem trước</h3>
                    <CardInternet data={form} />
                </>
            )}

            {/* LIST */}
            <h3>Danh sách gói</h3>

            {Object.keys(grouped).map(cate => (

                <div key={cate} style={{ marginBottom: 40 }}>

                    <h3 style={{
                        borderLeft: "6px solid red",
                        paddingLeft: 10
                    }}>
                        {cate}
                    </h3>

                    <div style={{
                        display: "flex",
                        gap: 20,
                        flexWrap: "wrap"
                    }}>
                        {grouped[cate].map(p => (
                            <CardInternet
                                key={p._id}
                                data={p}
                                isAdmin
                                onEdit={edit}
                                onDelete={remove}
                            />
                        ))}
                    </div>

                </div>

            ))}

        </div>
    )
}