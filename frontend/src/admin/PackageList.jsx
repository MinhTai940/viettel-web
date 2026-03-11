import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import PlanCard from "../Page/PlanCard"

function PackageList() {

    const [categories, setCategories] = useState([])
    const [packages, setPackages] = useState([])

    const [selectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        fetchCategories()
        fetchPackages()

    }, [])

    const fetchCategories = async () => {

        const res = await API.get("/categories")
        setCategories(res.data)

    }

    const fetchPackages = async () => {

        const res = await API.get("/packages")
        setPackages(res.data)

    }

    const deletePackage = async (id) => {

        if (!window.confirm("Bạn có chắc muốn xóa gói này?")) return

        await API.delete(`/packages/${id}`)

        fetchPackages()

    }

    const editPackage = (pkg) => {

        navigate("/admin/packages", {
            state: pkg
        })

    }

    // ================= FILTER =================

    const filteredPackages = packages.filter(pkg => {

        const matchCategory = selectedCategory
            ? pkg.category?.toString() === selectedCategory
            : true

        const matchSearch = pkg.name
            .toLowerCase()
            .includes(search.toLowerCase())

        return matchCategory && matchSearch

    })

    return (

        <div style={{ padding: 40 }}>

            <h2>Danh sách gói cước</h2>

            {/* SEARCH + FILTER */}

            <div
                style={{
                    display: "flex",
                    gap: 20,
                    marginBottom: 30
                }}
            >

                {/* COMBOBOX CATEGORY */}

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: 8 }}
                >

                    <option value="">Tất cả danh mục</option>

                    {categories.map(c => (

                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>

                    ))}

                </select>

                {/* SEARCH INPUT */}

                <input
                    type="text"
                    placeholder="Tìm theo tên gói..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: 8,
                        width: 250
                    }}
                />

            </div>

            {/* CATEGORY DISPLAY */}

            {categories.map(category => {

                const categoryPackages = filteredPackages.filter(
                    p => p.category?.toString() === category._id
                )

                if (categoryPackages.length === 0) return null

                return (

                    <div key={category._id} style={{ marginBottom: 50 }}>

                        <h2>{category.name}</h2>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "40px 20px",
                                alignItems: "flex-start"
                            }}
                        >

                            {categoryPackages.map(p => (

                                <div key={p._id}>

                                    <PlanCard
                                        id={p._id}
                                        planName={p.name}
                                        dataValue={p.data}
                                        dataUnit=""
                                        dataDuration="/NGÀY"
                                        price={p.price}
                                        priceDuration={p.duration}
                                        smsCode={p.sms_code}
                                        hasCallIcon={true}
                                        hasTv360Icon={true}
                                        hasCloudIcon={true}
                                    />

                                    {/* ADMIN BUTTONS */}

                                    <div
                                        style={{
                                            marginTop: 10,
                                            display: "flex",
                                            gap: 10,
                                            justifyContent: "center"
                                        }}
                                    >

                                        <button
                                            style={{
                                                background: "#3498db",
                                                color: "white",
                                                border: "none",
                                                padding: "6px 12px",
                                                borderRadius: 6
                                            }}
                                            onClick={() => editPackage(p)}
                                        >
                                            Sửa
                                        </button>

                                        <button
                                            style={{
                                                background: "#e74c3c",
                                                color: "white",
                                                border: "none",
                                                padding: "6px 12px",
                                                borderRadius: 6
                                            }}
                                            onClick={() => deletePackage(p._id)}
                                        >
                                            Xóa
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )

            })}

        </div>

    )

}

export default PackageList