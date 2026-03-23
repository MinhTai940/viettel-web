import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import PlanCard from "../Page/PlanCard"

function PackageList() {

    const [categories, setCategories] = useState([])
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("")

    const [activeTab, setActiveTab] = useState("package")

    const [categoryName, setCategoryName] = useState("")
    const [parentCategory, setParentCategory] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [])

    // ================= LOAD DATA =================
    const loadData = async () => {

        setLoading(true)

        try {

            const catRes = await API.get("/categories")
            const pkgRes = await API.get("/packages")

            setCategories(Array.isArray(catRes.data) ? catRes.data : [])
            setPackages(Array.isArray(pkgRes.data) ? pkgRes.data : [])

            console.log("✅ Packages loaded:", pkgRes.data)

        } catch (err) {
            console.log("❌ Load error:", err)
            setPackages([])
            setCategories([])
        }

        setLoading(false)
    }

    // ================= CREATE CATEGORY =================
    const createCategory = async () => {

        if (!categoryName.trim()) {
            alert("Nhập tên danh mục")
            return
        }

        try {

            await API.post("/categories", {
                name: categoryName,
                parent: parentCategory || null
            })

            alert("✅ Tạo danh mục thành công")

            setCategoryName("")
            setParentCategory("")

            loadData()

        } catch (err) {
            alert("❌ Lỗi tạo danh mục")
        }
    }

    // ================= DELETE PACKAGE =================
    const deletePackage = async (id) => {

        if (!window.confirm("Xóa gói này?")) return

        await API.delete(`/packages/${id}`)
        loadData()
    }

    // ================= EDIT =================
    const editPackage = (pkg) => {
        navigate("/admin/packages", { state: pkg })
    }

    // ================= FILTER =================
    const filteredPackages = packages.filter(pkg => {

        if (!pkg || !pkg.category) return false

        const categoryId =
            typeof pkg.category === "object"
                ? pkg.category?._id
                : pkg.category

        const matchCategory =
            selectedCategory ? categoryId === selectedCategory : true

        const matchSearch =
            pkg.name?.toLowerCase().includes(search.toLowerCase()) ?? true

        return matchCategory && matchSearch
    })

    // ================= GROUP =================
    const categoryGroups = categories.map(category => {

        const groupPackages = filteredPackages.filter(pkg => {

            if (!pkg.category) return false

            const categoryId =
                typeof pkg.category === "object"
                    ? pkg.category?._id
                    : pkg.category

            return categoryId === category._id
        })

        return {
            category,
            packages: groupPackages
        }

    }).filter(g => g.packages.length > 0)
    const childCategories = categories.filter(c => c.parent)

    return (
        <>
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .tab-container { position: relative; }
                .tab { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); position: relative; }
                .tab.active { color: #e5002b; font-weight: 600; }
                .tab-line { position: absolute; bottom: -2px; height: 3px; background: linear-gradient(90deg, #e5002b, #ff6b35); border-radius: 2px; transition: all 0.3s ease; transform: scaleX(0); transform-origin: left; }
                .package-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important; }
            `}</style>
            <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '24px 0' }}>
                {/* Header */}
                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    marginBottom: '32px',
                    padding: '32px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }} className="card-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                        <div style={{ flex: 1 }}>
                            <h1 style={{
                                fontSize: '36px',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #e5002b, #ff6b35)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                lineHeight: '1.1'
                            }} className="card-title">📦 Quản lý gói cước</h1>
                            <div className="tab-container" style={{
                                display: 'flex',
                                background: 'rgba(248,250,252,0.6)',
                                borderRadius: '16px',
                                padding: '4px',
                                marginTop: '24px',
                                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <div
                                    className={`tab ${activeTab === "package" ? "active" : ""}`}
                                    style={{
                                        flex: 1,
                                        padding: '16px 24px',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        color: activeTab === "package" ? '#e5002b' : '#64748b',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        zIndex: 2
                                    }}
                                    onClick={() => setActiveTab("package")}
                                >
                                    📋 Danh sách gói ({filteredPackages.length})
                                </div>
                                <div
                                    className={`tab ${activeTab === "category" ? "active" : ""}`}
                                    style={{
                                        flex: 1,
                                        padding: '16px 24px',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        color: activeTab === "category" ? '#e5002b' : '#64748b',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        zIndex: 2
                                    }}
                                    onClick={() => setActiveTab("category")}
                                >
                                    🗂️ Danh mục ({categories.length})
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '4px',
                                    left: activeTab === "package" ? '8px' : 'calc(50% + 4px)',
                                    right: activeTab === "package" ? 'calc(50% + 4px)' : '8px',
                                    height: '32px',
                                    background: 'linear-gradient(135deg, #e5002b, #ff6b35)',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 12px rgba(229,0,43,0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                    zIndex: 1
                                }} className="tab-line" />
                            </div>
                            <p style={{
                                margin: '16px 0 0 0',
                                color: '#6b7280',
                                fontSize: '16px'
                            }} className="card-subtitle">
                                {loading ? '⏳ Đang tải dữ liệu...' : `${filteredPackages.length} gói cước • ${categories.length} danh mục`}
                            </p>
                        </div>
                        <button
                            style={{
                                padding: '16px 32px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 8px 25px rgba(16,185,129,0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 35px rgba(16,185,129,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 25px rgba(16,185,129,0.4)';
                            }}
                            onClick={loadData}
                        >
                            ♻️ Làm mới
                        </button>
                    </div>

                    <p className="card-subtitle">
                        {loading ? "Đang tải..." : `${filteredPackages.length} gói`}
                    </p>

                </div>

                {/* Category Tab */}
                {activeTab === "category" && (
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        marginBottom: '32px'
                    }} className="admin-card">
                        <h3 style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>🗂️ Tạo danh mục mới</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '16px', color: '#374151' }}>Danh mục cha</label>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        border: '2px solid rgba(229,0,43,0.2)',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.9)',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        backdropFilter: 'blur(10px)',
                                        appearance: 'none',
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 16px center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '16px'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                    value={parentCategory}
                                    onChange={(e) => setParentCategory(e.target.value)}
                                >
                                    <option value="">📁 Danh mục gốc</option>
                                    {categories
                                        .filter(c => !c.parent)
                                        .map(c => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '16px', color: '#374151' }}>Tên danh mục</label>
                                <input
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        border: '2px solid rgba(229,0,43,0.2)',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.9)',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                    placeholder="VD: Gói cước Internet"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                            <button
                                style={{
                                    padding: '16px 32px',
                                    background: 'rgba(107,114,128,0.1)',
                                    color: '#6b7280',
                                    border: '1px solid rgba(107,114,128,0.2)',
                                    borderRadius: '50px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => {
                                    setActiveTab("package");
                                    setCategoryName("");
                                    setParentCategory("");
                                }}
                            >
                                ← Trở về danh sách
                            </button>
                            <button
                                style={{
                                    padding: '18px 40px',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: '17px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 35px rgba(16,185,129,0.4)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 15px 45px rgba(16,185,129,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 10px 35px rgba(16,185,129,0.4)';
                                }}
                                onClick={createCategory}
                            >
                                🚀 Tạo danh mục
                            </button>
                        </div>
                    </div>
                )}

                {/* Package Tab */}
                {activeTab === "package" && (
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        marginBottom: '32px'
                    }}>
                        {/* Filters */}
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'end',
                            marginBottom: '32px',
                            flexWrap: 'wrap'
                        }} className="filters-row">
                            <div style={{ flex: 1, minWidth: '280px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Danh mục</label>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        border: '2px solid rgba(229,0,43,0.2)',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.9)',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        backdropFilter: 'blur(10px)',
                                        appearance: 'none',
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 16px center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '16px'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">📂 Tất cả danh mục ({packages.length})</option>
                                    {childCategories.map(c => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Tìm kiếm gói</label>
                                <div style={{
                                    position: 'relative',
                                    width: '100%'
                                }}>
                                    <input
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px 16px 48px',
                                            border: '2px solid rgba(229,0,43,0.2)',
                                            borderRadius: '16px',
                                            background: 'rgba(255,255,255,0.9)',
                                            fontSize: '16px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#e5002b'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(229,0,43,0.2)'}
                                        placeholder="🔍 Tìm theo tên gói cước..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af',
                                        fontSize: '18px',
                                        pointerEvents: 'none'
                                    }}>🔍</span>
                                </div>
                            </div>
                            <div style={{ minWidth: '160px' }}>
                                <button
                                    style={{
                                        width: '100%',
                                        padding: '16px 24px',
                                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 25px rgba(59,130,246,0.4)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 12px 35px rgba(59,130,246,0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(59,130,246,0.4)';
                                    }}
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedCategory("");
                                    }}
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            marginBottom: '40px'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))',
                                padding: '24px',
                                borderRadius: '20px',
                                border: '1px solid rgba(16,185,129,0.2)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '8px' }}>{filteredPackages.length}</div>
                                <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>Gói cước</div>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(29,78,216,0.1))',
                                padding: '24px',
                                borderRadius: '20px',
                                border: '1px solid rgba(59,130,246,0.2)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '36px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>{categories.length}</div>
                                <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>Danh mục</div>
                            </div>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(229,0,43,0.1), rgba(255,107,53,0.1))',
                                padding: '24px',
                                borderRadius: '20px',
                                border: '1px solid rgba(229,0,43,0.2)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '36px', fontWeight: '800', color: '#e5002b', marginBottom: '8px' }}>{loading ? '...' : packages.length}</div>
                                <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>Tổng gói</div>
                            </div>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '80px 40px',
                                textAlign: 'center',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }} className="admin-card">
                                <div style={{ fontSize: '48px', marginBottom: '24px', color: '#9ca3af' }}>⏳</div>
                                <h3 style={{ color: '#374151', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Đang tải dữ liệu...</h3>
                                <p style={{ color: '#6b7280' }}>Vui lòng chờ trong giây lát</p>
                            </div>
                        )}

                        {/* Empty */}
                        {!loading && categoryGroups.length === 0 && (
                            <div style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '80px 40px',
                                textAlign: 'center',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }} className="admin-card">
                                <div style={{ fontSize: '64px', marginBottom: '24px', color: '#d1d5db' }}>📦</div>
                                <h3 style={{ color: '#374151', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Không tìm thấy gói cước</h3>
                                <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>Thử thay đổi bộ lọc hoặc tạo gói cước mới từ <strong>trang tạo gói</strong></p>
                                <button style={{
                                    marginTop: '32px',
                                    padding: '16px 32px',
                                    background: 'linear-gradient(135deg, #e5002b, #ff6b35)',
                                    color: 'white',
                                    borderRadius: '50px',
                                    border: 'none',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 25px rgba(229,0,43,0.4)'
                                }} onClick={() => navigate('/admin/packages')}>
                                    🚀 Tạo gói mới
                                </button>
                            </div>
                        )}

                        {/* Groups */}
                        {categoryGroups.map((group, groupIndex) => (
                            <div key={group.category._id} style={{
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '40px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                marginBottom: '32px',
                                animation: 'fadeInUp 0.6s ease forwards',
                                animationDelay: `${groupIndex * 0.1}s`
                            }} className="mb-6">
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '32px',
                                    paddingBottom: '20px',
                                    borderBottom: '2px solid rgba(229,0,43,0.1)'
                                }}>
                                    <h2 style={{
                                        fontSize: '28px',
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }} className="card-title">
                                        📂 {group.category.name}
                                        <span style={{
                                            background: 'rgba(229,0,43,0.1)',
                                            color: '#e5002b',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}>{group.packages.length} gói</span>
                                    </h2>
                                    <div style={{
                                        opacity: 0.7,
                                        fontSize: '14px',
                                        color: '#6b7280'
                                    }}>
                                        {new Date().toLocaleDateString('vi-VN')}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                                    {group.packages.map(p => (
                                        <div key={p._id} style={{
                                            background: 'white',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                            position: 'relative'
                                        }} className="package-card">
                                            <PlanCard
                                                id={p._id}
                                                planName={p.name}
                                                dataValue={p.data}
                                                dataDuration="/ngày"
                                                price={p.price}
                                                priceDuration={`/${p.duration} ngày`}
                                                smsCode={p.sms_code}
                                            />
                                            <div style={{
                                                padding: '20px',
                                                background: 'linear-gradient(135deg, rgba(248,250,252,0.8), rgba(241,245,249,0.8))',
                                                borderTop: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '12px',
                                                    justifyContent: 'flex-end'
                                                }}>
                                                    <button
                                                        style={{
                                                            padding: '12px 24px',
                                                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                                            color: 'white',
                                                            borderRadius: '12px',
                                                            border: 'none',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'translateY(-1px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(59,130,246,0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(59,130,246,0.3)';
                                                        }}
                                                        onClick={() => editPackage(p)}
                                                    >
                                                        ✏️ Sửa
                                                    </button>
                                                    <button
                                                        style={{
                                                            padding: '12px 24px',
                                                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                                            color: 'white',
                                                            borderRadius: '12px',
                                                            border: 'none',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'translateY(-1px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(239,68,68,0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(239,68,68,0.3)';
                                                        }}
                                                        onClick={() => deletePackage(p._id)}
                                                    >
                                                        🗑️ Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default PackageList