import { useState, useEffect } from "react"
import API from "../services/api"

function Packages() {

    const [categories, setCategories] = useState([])

    const [categoryName, setCategoryName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const [name, setName] = useState("")
    const [data, setData] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")
    const [smsCode, setSmsCode] = useState("")

    const [editingPackage, setEditingPackage] = useState(null)

    useEffect(() => {

        fetchCategories()

    }, [])


    const fetchCategories = async () => {

        const res = await API.get("/categories")
        setCategories(res.data)

    }


    const createCategory = async () => {

        if (!categoryName) return

        await API.post("/categories", { name: categoryName })

        setCategoryName("")
        fetchCategories()

    }


    const deleteCategory = async (id) => {

        if (!window.confirm("Xóa danh mục này?")) return

        await API.delete(`/categories/${id}`)
        fetchCategories()

    }


    // ================= CREATE PACKAGE =================

    const createPackage = async () => {

        if (!selectedCategory) return alert("Chọn danh mục")

        await API.post("/packages", {

            name,
            data,
            price,
            duration,
            sms_code: smsCode,
            category: selectedCategory

        })

        resetForm()

        alert("Tạo gói thành công")

    }


    // ================= UPDATE PACKAGE =================

    const updatePackage = async () => {

        await API.put(`/packages/${editingPackage}`, {

            name,
            data,
            price,
            duration,
            sms_code: smsCode,
            category: selectedCategory

        })

        resetForm()

        alert("Cập nhật thành công")

    }


    const resetForm = () => {

        setEditingPackage(null)

        setName("")
        setData("")
        setPrice("")
        setDuration("")
        setSmsCode("")
        setSelectedCategory("")

    }


    return (

        <div style={{ padding: 40 }}>

            <h2>Quản lý gói cước</h2>

            <div style={{ display: "flex", gap: 60 }}>

                <div>

                    <h3>Tạo gói cước</h3>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >

                        <option value="">Chọn danh mục</option>

                        {categories.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}

                    </select>

                    <br /><br />

                    <input
                        placeholder="Tên gói"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <br /><br />

                    <input
                        placeholder="Data (VD: 5GB)"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    <br /><br />

                    <input
                        placeholder="Giá (VD: 135000)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <br /><br />

                    <input
                        placeholder="Thời hạn (VD: 30 ngày)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />

                    <br /><br />

                    <input
                        placeholder="Cú pháp SMS (VD: 5G150 UP)"
                        value={smsCode}
                        onChange={(e) => setSmsCode(e.target.value)}
                    />

                    <br /><br />

                    {editingPackage ?

                        <button onClick={updatePackage}>
                            Cập nhật gói
                        </button>

                        :

                        <button onClick={createPackage}>
                            Tạo gói
                        </button>

                    }

                </div>


                <div>

                    <h3>Danh mục</h3>

                    <input
                        placeholder="Tên danh mục"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <button onClick={createCategory}>
                        Thêm
                    </button>

                    <br /><br />

                    {categories.map(c => (

                        <div key={c._id} style={{ marginBottom: 10 }}>

                            {c.name}

                            <button
                                style={{ marginLeft: 10 }}
                                onClick={() => deleteCategory(c._id)}
                            >
                                Xóa
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    )

}

export default Packages