import { useState, useEffect } from "react"
import API from "../services/api"
import "./Admin.css"

function Packages() {

    const [activeTab, setActiveTab] = useState("packages")
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [parentCategory, setParentCategory] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [name, setName] = useState("")
    const [data, setData] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")
    const [smsCode, setSmsCode] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const res = await API.get("/categories")
            setCategories(res.data)
        } catch (error) {
            console.error("Lỗi tải danh mục:", error)
        }
    }

    const createCategory = async () => {
        if (!categoryName.trim()) return

        setLoading(true)
        try {
            await API.post("/categories", {
                name: categoryName.trim(),
                parent: parentCategory || null
            })
            setCategoryName("")
            setParentCategory("")
            fetchCategories()
        } catch (error) {
            alert("Lỗi tạo danh mục")
        } finally {
            setLoading(false)
        }
    }

    const deleteCategory = async (id) => {
        if (!window.confirm("Xóa danh mục này?")) return
        try {
            await API.delete(`/categories/${id}`)
            fetchCategories()
        } catch (error) {
            alert("Lỗi xóa danh mục")
        }
    }

    const createPackage = async () => {
        if (!selectedCategory || !name.trim()) {
            alert("Vui lòng chọn danh mục và nhập tên gói")
            return
        }

        setLoading(true)
        try {
            await API.post("/packages", {
                name: name.trim(),
                data: data.trim() || "0",
                price: parseInt(price) || 0,
                duration: duration.trim() || "30",
                sms_code: smsCode.trim(),
                category: selectedCategory
            })
            alert("Tạo gói thành công!")
            setName("")
            setData("")
            setPrice("")
            setDuration("")
            setSmsCode("")
            setSelectedCategory("")
        } catch (error) {
            alert("Lỗi tạo gói cước")
        } finally {
            setLoading(false)
        }
    }

    const childCategories = categories.filter(c => c.parent)
    const parentCategories = categories.filter(c => !c.parent)

    return (
        <div className="admin-card">
            <div className="card-header">
                <h1 className="card-title">Quản lý gói cước</h1>
            </div>

            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'packages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('packages')}
                >
                    Tạo gói cước
                </div>
                <div
                    className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('categories')}
                >
                    Danh mục
                </div>
            </div>

            <div className="tab-content-wrapper">
                {activeTab === 'packages' && (
                    <div className="tab-content active">
                        <div className="form-group">
                            <label className="form-label">Danh mục *</label>
                            <select
                                className="select-field"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Chọn danh mục con</option>
                                {childCategories.map(c => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tên gói cước *</label>
                            <input
                                className="input-field"
                                placeholder="VD: VIP 30 Ngày"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4 mb-6">
                            <div className="form-group flex-1">
                                <label className="form-label">Dữ liệu</label>
                                <input
                                    className="input-field"
                                    placeholder="VD: 30"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
                            </div>
                            <div className="form-group flex-1">
                                <label className="form-label">Giá (VNĐ)</label>
                                <input
                                    className="input-field"
                                    type="number"
                                    placeholder="VD: 50000"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <div className="form-group flex-1">
                                <label className="form-label">Thời hạn</label>
                                <input
                                    className="input-field"
                                    placeholder="VD: 30"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className="form-group flex-1">
                                <label className="form-label">Mã SMS</label>
                                <input
                                    className="input-field"
                                    placeholder="VD: VIP30"
                                    value={smsCode}
                                    onChange={(e) => setSmsCode(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={createPackage}
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Đang tạo...
                                </>
                            ) : (
                                'Tạo gói cước mới'
                            )}
                        </button>
                    </div>
                )}

                {activeTab === 'categories' && (
                    <div className="tab-content active">
                        <div className="flex gap-4 mb-6">
                            <div className="form-group flex-1">
                                <label className="form-label">Danh mục cha</label>
                                <select
                                    className="select-field"
                                    value={parentCategory}
                                    onChange={(e) => setParentCategory(e.target.value)}
                                >
                                    <option value="">Danh mục lớn</option>
                                    {parentCategories.map(c => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group flex-1">
                                <label className="form-label">Tên danh mục mới</label>
                                <input
                                    className="input-field"
                                    placeholder="VD: Premium"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary mb-6"
                            onClick={createCategory}
                            disabled={loading || !categoryName.trim()}
                            style={{ width: '100%' }}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Đang tạo...
                                </>
                            ) : (
                                'Thêm danh mục'
                            )}
                        </button>

                        <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Danh sách danh mục</h3>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Loại</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(c => (
                                        <tr key={c._id}>
                                            <td style={{ fontWeight: c.parent ? 'normal' : '600' }}>
                                                {c.parent ? '  └─ ' : ''}{c.name}
                                            </td>
                                            <td>{c.parent ? 'Con' : 'Cha'}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleteCategory(c._id)}
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Packages
