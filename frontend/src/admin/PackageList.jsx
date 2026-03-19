import { useEffect, useState, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import PlanCard from "../Page/PlanCard"
import "./Admin.css"

function PackageList() {

    const [categories, setCategories] = useState([])
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("")
    const [selectedIds, setSelectedIds] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        try {
            const [catRes, pkgRes] = await Promise.all([
                API.get("/categories"),
                API.get("/packages")
            ])
            setCategories(catRes.data)
            setPackages(pkgRes.data)
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error)
        } finally {
            setLoading(false)
        }
    }

    const deletePackage = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa gói này?")) return

        try {
            await API.delete(`/packages/${id}`)
            loadData()
        } catch (error) {
            alert("Lỗi xóa gói")
        }
    }

    const batchDelete = async () => {
        if (selectedIds.length === 0) return
        if (!window.confirm(`Xóa ${selectedIds.length} gói đã chọn?`)) return

        try {
            await Promise.all(selectedIds.map(id => API.delete(`/packages/${id}`)))
            setSelectedIds([])
            loadData()
        } catch (error) {
            alert("Lỗi xóa hàng loạt")
        }
    }

    const editPackage = useCallback((pkg) => {
        navigate("/admin/packages", { state: pkg })
    }, [navigate])

    // Debounced search
    const debouncedSearch = useCallback(
        useMemo(() => {
            const timeoutId = setTimeout(() => {
                // Search logic here if needed for API
            }, 300)
            return () => clearTimeout(timeoutId)
        }, [search]),
        [search]
    )

    useEffect(() => {
        debouncedSearch()
    }, [search, debouncedSearch])

    // Filters
    const filteredPackages = packages.filter(pkg => {
        const matchCategory = selectedCategory
            ? pkg.category?.toString() === selectedCategory
            : true
        const matchSearch = pkg.name.toLowerCase().includes(search.toLowerCase())
        return matchCategory && matchSearch
    })

    const categoryGroups = categories.map(category => {
        const categoryPackages = filteredPackages.filter(
            p => p.category?.toString() === category._id
        )
        return { category, packages: categoryPackages }
    }).filter(group => group.packages.length > 0)

    return (
        <div>
            <div className="card-header">
                <div>
                    <h1 className="card-title">Danh sách gói cước</h1>
                    <p className="card-subtitle">
                        {loading ? "Đang tải..." : `${filteredPackages.length} gói cước`}
                    </p>
                </div>
                <div className="flex gap-2">
                    {selectedIds.length > 0 && (
                        <button className="btn btn-sm btn-danger" onClick={batchDelete}>
                            Xóa đã chọn ({selectedIds.length})
                        </button>
                    )}
                    <button className="btn btn-primary btn-sm" onClick={loadData}>
                        ♻️ Làm mới
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-row">
                <div className="filter-group">
                    <select
                        className="select-field"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="🔍 Tìm theo tên gói..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ minWidth: '300px' }}
                    />
                </div>
            </div>

            {loading ? (
                <div className="admin-card text-center" style={{ padding: '60px' }}>
                    <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px', margin: '0 auto 20px' }}></div>
                    <p>Đang tải danh sách gói cước...</p>
                </div>
            ) : categoryGroups.length === 0 ? (
                <div className="admin-card text-center" style={{ padding: '60px', color: '#6b7280' }}>
                    <p>Không tìm thấy gói cước nào</p>
                </div>
            ) : (
                categoryGroups.map(({ category, packages }) => (
                    <div key={category._id} className="mb-6">
                        <div className="card-header">
                            <h2 className="card-title" style={{ fontSize: '20px' }}>
                                {category.name} ({packages.length})
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4" style={{ gap: '24px' }}>
                            {packages.map(p => (
                                <div key={p._id} className="flex flex-col items-center" style={{ minWidth: '280px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(p._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds([...selectedIds, p._id])
                                                } else {
                                                    setSelectedIds(selectedIds.filter(id => id !== p._id))
                                                }
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                zIndex: 10,
                                                width: '20px',
                                                height: '20px'
                                            }}
                                        />
                                        <PlanCard
                                            id={p._id}
                                            planName={p.name}
                                            dataValue={p.data}
                                            dataUnit=""
                                            dataDuration={`/${p.duration || '30'} NGÀY`}
                                            price={p.price}
                                            priceDuration={p.duration || '30'}
                                            smsCode={p.sms_code}
                                            hasCallIcon={true}
                                            hasTv360Icon={true}
                                            hasCloudIcon={true}
                                        />
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => editPackage(p)}
                                        >
                                            ✏️ Sửa
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deletePackage(p._id)}
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default PackageList
