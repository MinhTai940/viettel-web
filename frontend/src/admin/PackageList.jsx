import { useEffect, useState } from "react"
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

            setCategories(catRes.data)
            setPackages(pkgRes.data)

        } catch (err) {
            console.log(err)
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

        const categoryId =
            typeof pkg.category === "object"
                ? pkg.category?._id
                : pkg.category

        const matchCategory =
            selectedCategory ? categoryId === selectedCategory : true

        const matchSearch =
            pkg.name?.toLowerCase().includes(search.toLowerCase())

        return matchCategory && matchSearch
    })

    // ================= GROUP =================
    const categoryGroups = categories.map(category => {

        const groupPackages = filteredPackages.filter(pkg => {

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
        <div>

            {/* ================= HEADER ================= */}
            <div className="card-header">

                <div>

                    <h1 className="card-title">Danh sách gói cước</h1>

                    <div className="tabs">

                        <div
                            className={activeTab === "package" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("package")}
                        >
                            Danh sách gói
                        </div>

                        <div
                            className={activeTab === "category" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("category")}
                        >
                            Tạo danh mục
                        </div>

                    </div>

                    <p className="card-subtitle">
                        {loading ? "Đang tải..." : `${filteredPackages.length} gói`}
                    </p>

                </div>

                <button className="btn btn-primary btn-sm" onClick={loadData}>
                    ♻️ Làm mới
                </button>

            </div>

            {/* ================= TAB CATEGORY ================= */}
            {activeTab === "category" && (

                <div className="admin-card">

                    <h3 style={{ marginBottom: 15 }}>Tạo danh mục</h3>

                    <select
                        className="select-field"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                    >
                        <option value="">Danh mục cha</option>

                        {categories
                            .filter(c => !c.parent)
                            .map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>

                    <input
                        className="input-field"
                        placeholder="Tên danh mục mới"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={createCategory}
                    >
                        Tạo danh mục
                    </button>

                </div>

            )}

            {/* ================= TAB PACKAGE ================= */}
            {activeTab === "package" && (
                <>
                    {/* FILTER */}
                    <div className="filters-row">

                        <select
                            className="select-field"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Tất cả danh mục</option>

                            {childCategories.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <input
                            className="input-field"
                            placeholder="Tìm theo tên gói..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="admin-card text-center">
                            Đang tải...
                        </div>
                    )}

                    {/* EMPTY */}
                    {!loading && categoryGroups.length === 0 && (
                        <div className="admin-card text-center">
                            Không tìm thấy gói cước nào
                        </div>
                    )}

                    {/* LIST */}
                    {categoryGroups.map(group => (

                        <div key={group.category._id} className="mb-6">

                            <h2 className="card-title">
                                {group.category.name}
                            </h2>

                            <div className="flex flex-wrap gap-4">

                                {group.packages.map(p => (

                                    <div key={p._id}>

                                        <PlanCard
                                            id={p._id}
                                            planName={p.name}
                                            dataValue={p.data}
                                            dataDuration="/ngày"
                                            price={p.price}
                                            priceDuration={`/${p.duration} ngày`}
                                            smsCode={p.sms_code}
                                        />

                                        <div className="flex gap-2 mt-2">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => editPackage(p)}
                                            >
                                                Sửa
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deletePackage(p._id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}
                </>
            )}

        </div>
    )
}

export default PackageList