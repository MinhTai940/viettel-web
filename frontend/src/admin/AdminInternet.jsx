import { useEffect, useState } from "react"
import API from "../services/api"
import CardInternet from "../Page/CardInternet"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import AdminInternetOrder from "./AdminInternetOrder"


export default function AdminInternet() {

    const [list, setList] = useState([])
    const [categories, setCategories] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [tab, setTab] = useState("package")
    const [cateName, setCateName] = useState("")
    const [detail, setDetail] = useState("")

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
    const removeCategory = async (id) => {

        const ok = window.confirm("Bạn chắc chắn muốn xóa danh mục ?")
        if (!ok) return

        try {
            await API.delete("/internet-category/" + id)

            alert("Đã xóa danh mục")

            loadData()   // reload lại list

        } catch (err) {

            alert("Không thể xóa danh mục")
            console.log(err)

        }
    }

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
            (!form.price_hn && !form.price_tinh)
        ) {
            window.alert("Nhập thiếu thông tin")
            return
        }

        const payload = {
            ...form,
            detail: detail,
            price_hn: Number(form.price_hn),
            price_tinh: form.price_tinh
                ? Number(form.price_tinh)
                : null
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
            description: "",
        })
        setDetail("")

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
            description: p.description,
        })
        setDetail(p.detail || "")
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
        <>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .tab-button { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; }
                .tab-button.active { background: linear-gradient(135deg, rgba(229,0,43,0.15), rgba(255,107,53,0.15)) !important; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(229,0,43,0.3); }
                .preview-card { animation: fadeInUp 0.6s ease; }
            `}</style>
            <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh'
            }}>
                {/* Header */}
                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(24px)',
                    borderRadius: '28px',
                    padding: '40px',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    marginBottom: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: 'linear-gradient(90deg, #e5002b, #ff6b35, #f59e0b, #10b981)',
                        animation: 'gradientShift 3s ease infinite'
                    }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h1 style={{
                                fontSize: '40px',
                                fontWeight: '900',
                                background: 'linear-gradient(135deg, #e5002b, #ff6b35, #f59e0b)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                lineHeight: 1,
                                letterSpacing: '-0.02em'
                            }}>🌐 Internet Lắp đặt</h1>
                            <p style={{
                                margin: '8px 0 0 0',
                                color: '#6b7280',
                                fontSize: '18px',
                                fontWeight: '500'
                            }}>Quản lý gói cước, danh mục & đơn hàng</p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button style={{
                                padding: '14px 28px',
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                color: 'white',
                                borderRadius: '50px',
                                border: 'none',
                                fontWeight: '600',
                                fontSize: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 25px rgba(59,130,246,0.4)',
                                transition: 'all 0.3s ease'
                            }} onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 12px 35px rgba(59,130,246,0.5)';
                            }} onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 8px 25px rgba(59,130,246,0.4)';
                            }} onClick={() => setTab("package")}>
                                ➕ Tạo gói mới
                            </button>
                            <button style={{
                                padding: '14px 28px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white',
                                borderRadius: '50px',
                                border: 'none',
                                fontWeight: '600',
                                fontSize: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 25px rgba(16,185,129,0.4)',
                                transition: 'all 0.3s ease'
                            }} onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 12px 35px rgba(16,185,129,0.5)';
                            }} onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 8px 25px rgba(16,185,129,0.4)';
                            }} onClick={loadData}>
                                🔄 Làm mới
                            </button>
                        </div>
                    </div>
                    {/* Tab Buttons */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(248,250,252,0.8)',
                        borderRadius: '20px',
                        padding: '8px',
                        boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.08)',
                        overflow: 'hidden'
                    }}>
                        <button
                            className="tab-button"
                            style={{
                                flex: 1,
                                padding: '20px 32px',
                                background: tab === "package" ? 'rgba(229,0,43,0.15)' : 'transparent',
                                color: tab === "package" ? '#e5002b' : '#64748b',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '700',
                                fontSize: '17px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                zIndex: 2
                            }}
                            onClick={() => setTab("package")}
                        >
                            📦 Tạo & Quản lý gói ({list.length})
                        </button>
                        <button
                            className="tab-button"
                            style={{
                                flex: 1,
                                padding: '20px 32px',
                                background: tab === "category" ? 'rgba(229,0,43,0.15)' : 'transparent',
                                color: tab === "category" ? '#e5002b' : '#64748b',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '700',
                                fontSize: '17px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                zIndex: 2
                            }}
                            onClick={() => setTab("category")}
                        >
                            🗂️ Danh mục ({categories.length})
                        </button>
                        <button
                            className="tab-button"
                            style={{
                                flex: 1,
                                padding: '20px 32px',
                                background: tab === "order" ? 'rgba(229,0,43,0.15)' : 'transparent',
                                color: tab === "order" ? '#e5002b' : '#64748b',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '700',
                                fontSize: '17px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                zIndex: 2
                            }}
                            onClick={() => setTab("order")}
                        >
                            📋 Đơn hàng ({'Tính năng sắp ra mắt'})
                        </button>
                    </div>
                </div>

                {/* Package Form */}
                {tab === "package" && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 420px',
                        gap: '40px',
                        marginBottom: '40px'
                    }}>
                        {/* Form Column */}
                        <div style={{
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '28px',
                            padding: '48px',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(255,255,255,0.25)'
                        }}>
                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: '#1f2937',
                                marginBottom: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>📦 {editingId ? 'Chỉnh sửa gói' : 'Tạo gói Internet mới'}</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Tên gói</label>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="VD: FTTH 300Mbps MAX"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Tốc độ</label>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="VD: 300 Mbps"
                                        value={form.speed}
                                        onChange={e => setForm({ ...form, speed: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Giá Hà Nội (VNĐ)</label>
                                    <input
                                        type="text"
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="VD: 350000"
                                        value={form.price_hn}
                                        onChange={e => setForm({
                                            ...form,
                                            price_hn: e.target.value.replace(/\D/g, "")
                                        })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Giá tỉnh (VNĐ)</label>
                                    <input
                                        type="text"
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="VD: 320000"
                                        value={form.price_tinh}
                                        onChange={e => setForm({
                                            ...form,
                                            price_tinh: e.target.value.replace(/\D/g, "")
                                        })}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Danh mục</label>
                                    <select
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                            appearance: 'none',
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                            backgroundPosition: 'right 24px center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '18px'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        value={form.category}
                                        onChange={e => setForm({ ...form, category: e.target.value })}
                                    >
                                        <option value="">📂 Chọn danh mục</option>
                                        {categories.map(c => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Mô tả ngắn gọn</label>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '20px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="VD: Tốc độ cao, ổn định, hỗ trợ 24/7"
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <label style={{ display: 'block', marginBottom: '20px', fontWeight: '700', fontSize: '18px', color: '#1f2937' }}>📝 Nội dung chi tiết</label>
                                <div style={{
                                    border: '2px solid rgba(229,0,43,0.2)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: '0 12px 48px rgba(0,0,0,0.12)'
                                }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={detail}
                                        onChange={setDetail}
                                        style={{ height: '300px' }}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                ['bold', 'italic', 'underline'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                [{ 'align': [] }],
                                                ['link', 'image'],
                                                [{ 'color': [] }, { 'background': [] }],
                                                ['clean']
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                <button style={{
                                    padding: '20px 48px',
                                    background: 'rgba(107,114,128,0.15)',
                                    color: '#374151',
                                    border: '1px solid rgba(107,114,128,0.3)',
                                    borderRadius: '50px',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    flex: 1
                                }} onClick={() => {
                                    setEditingId(null);
                                    setForm({
                                        name: "",
                                        speed: "",
                                        price_hn: "",
                                        price_tinh: "",
                                        category: "",
                                        description: ""
                                    });
                                    setDetail("");
                                }}>
                                    🔄 Hủy & Tạo mới
                                </button>
                                <button style={{
                                    padding: '22px 56px',
                                    background: 'linear-gradient(135deg, #e5002b, #ff6b35)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: '18px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 45px rgba(229,0,43,0.4)',
                                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                    flex: 1
                                }} onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-4px)';
                                    e.target.style.boxShadow = '0 25px 60px rgba(229,0,43,0.5)';
                                }} onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 15px 45px rgba(229,0,43,0.4)';
                                }} onClick={submit} disabled={!form.name || !form.speed}>
                                    {editingId ? '💾 Cập nhật gói' : '🚀 Tạo gói Internet'}
                                </button>
                            </div>
                        </div>
                        {/* Preview Column */}
                        <div>
                            <div style={{
                                position: 'sticky',
                                top: '32px',
                                height: 'fit-content'
                            }}>
                                {form.name && (
                                    <div style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(24px)',
                                        borderRadius: '28px',
                                        padding: '32px',
                                        boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                                        border: '1px solid rgba(229,0,43,0.2)',
                                        marginBottom: '24px'
                                    }} className="preview-card">
                                        <h3 style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1f2937',
                                            marginBottom: '24px'
                                        }}>👁️ Xem trước</h3>
                                        <CardInternet data={{
                                            name: form.name,
                                            speed: form.speed,
                                            price_hn: form.price_hn,
                                            price_tinh: form.price_tinh,
                                            description: form.description
                                        }} />
                                    </div>
                                )}
                                <div style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    backdropFilter: 'blur(24px)',
                                    borderRadius: '28px',
                                    padding: '40px',
                                    textAlign: 'center',
                                    boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                                    border: '1px solid rgba(255,255,255,0.25)'
                                }}>
                                    <div style={{ fontSize: '64px', marginBottom: '24px', color: '#d1d5db' }}>{form.name ? '✅' : '🎯'}</div>
                                    <h3 style={{ fontSize: '28px', fontWeight: '700', color: form.name ? '#10b981' : '#6b7280', marginBottom: '12px' }}>
                                        {form.name ? 'Gói cước sẵn sàng!' : 'Điền thông tin để xem trước'}
                                    </h3>
                                    <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.6' }}>
                                        Nhập đầy đủ thông tin bên trái để xem trước giao diện
                                        <br />
                                        hiển thị cho khách hàng
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Form */}
                {tab === "category" && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '48px'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '28px',
                            padding: '48px',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(255,255,255,0.25)'
                        }}>
                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: '#1f2937',
                                marginBottom: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>🗂️ Quản lý danh mục</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '16px', fontWeight: '700', fontSize: '18px', color: '#1f2937' }}>Tên danh mục mới</label>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '24px 28px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '24px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '18px',
                                            fontWeight: '500',
                                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                            outline: 'none',
                                            backdropFilter: 'blur(12px)',
                                            boxShadow: '0 12px 48px rgba(0,0,0,0.1)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="VD: Gói FTTH | Gói Wifi Mesh"
                                        value={cateName}
                                        onChange={e => setCateName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
                                <button style={{
                                    padding: '22px 56px',
                                    background: 'rgba(107,114,128,0.15)',
                                    color: '#374151',
                                    border: '1px solid rgba(107,114,128,0.3)',
                                    borderRadius: '50px',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    flex: 1
                                }} onClick={() => setTab("package")}>
                                    ← Trở về tạo gói
                                </button>
                                <button style={{
                                    padding: '24px 64px',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: '19px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 45px rgba(16,185,129,0.4)',
                                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                    flex: 1
                                }} onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-4px)';
                                    e.target.style.boxShadow = '0 25px 60px rgba(16,185,129,0.5)';
                                }} onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 15px 45px rgba(16,185,129,0.4)';
                                }} onClick={createCategory} disabled={!cateName.trim()}>
                                    🚀 Tạo danh mục
                                </button>
                            </div>
                        </div>
                        <div>
                            <div style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(24px)',
                                borderRadius: '28px',
                                padding: '48px',
                                boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                height: 'fit-content'
                            }}>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#1f2937',
                                    marginBottom: '32px'
                                }}>📊 Danh sách danh mục hiện tại ({categories.length})</h3>
                                <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                                    {categories.map((c, index) => (
                                        <div key={c._id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '24px',
                                            background: index % 2 === 0 ? 'rgba(248,250,252,0.5)' : 'transparent',
                                            borderRadius: '20px',
                                            marginBottom: '16px',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            transition: 'all 0.3s ease'
                                        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #e5002b, #ff6b35)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold',
                                                    boxShadow: '0 8px 24px rgba(229,0,43,0.3)'
                                                }}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>{c.name}</div>
                                                    <div style={{ color: '#6b7280', fontSize: '14px' }}>ID: {c._id.slice(-8)}</div>
                                                </div>
                                            </div>
                                            <button style={{
                                                padding: '12px 24px',
                                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                                color: 'white',
                                                borderRadius: '12px',
                                                border: 'none',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                opacity: 0.9
                                            }} onClick={() => removeCategory(c._id)
                                            }
                                            >
                                                🗑️ Xóa
                                            </button>
                                        </div>
                                    ))}
                                    {categories.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '60px 40px', color: '#9ca3af' }}>
                                            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🗂️</div>
                                            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Chưa có danh mục nào</h3>
                                            <p>Tạo danh mục đầu tiên để bắt đầu quản lý gói Internet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Order Tab */}
                {tab === "order" && (
                    <AdminInternetOrder />
                )}

                {/* List & Preview */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>
                    {/* List */}
                    <div>
                        <div style={{
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '28px',
                            padding: '48px',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            marginBottom: '40px'
                        }}>
                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: '#1f2937',
                                marginBottom: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>📋 Danh sách gói Internet</h2>
                            {Object.keys(grouped).map((cateName, index) => (
                                <div key={cateName} style={{
                                    marginBottom: '48px',
                                    animationDelay: `${index * 0.1}s`
                                }}>
                                    <h3 style={{
                                        fontSize: '26px',
                                        fontWeight: '800',
                                        color: '#1f2937',
                                        marginBottom: '28px',
                                        paddingBottom: '16px',
                                        borderBottom: '3px solid rgba(229,0,43,0.2)',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {cateName} ({grouped[cateName].length} gói)
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                                        gap: '28px'
                                    }}>
                                        {grouped[cateName].map(p => (
                                            <div key={p._id} style={{
                                                background: 'white',
                                                borderRadius: '24px',
                                                overflow: 'hidden',
                                                boxShadow: '0 16px 56px rgba(0,0,0,0.12)',
                                                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                                                position: 'relative'
                                            }}>
                                                <CardInternet
                                                    data={p}
                                                    isAdmin={true}
                                                    onEdit={edit}
                                                    onDelete={remove}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {Object.keys(grouped).length === 0 && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '80px 0',
                                    color: '#9ca3af'
                                }}>
                                    <div style={{ fontSize: '72px', marginBottom: '32px' }}>📡</div>
                                    <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>Chưa có gói Internet nào</h3>
                                    <p style={{ fontSize: '18px' }}>Tạo gói Internet đầu tiên từ form bên trên</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Preview */}
                    <div style={{
                        position: 'sticky',
                        top: '32px',
                        height: 'fit-content'
                    }}>
                        {form.name && (
                            <div style={{
                                position: 'relative',
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(24px)',
                                borderRadius: '28px',
                                padding: '48px 40px',
                                boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
                                border: '2px solid rgba(229,0,43,0.25)',
                                marginBottom: '32px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '32px',
                                    padding: '8px 20px',
                                    background: 'white',
                                    borderRadius: '20px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    color: '#e5002b'
                                }}>👁️ XEM TRƯỚC</div>
                                <CardInternet data={form} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
