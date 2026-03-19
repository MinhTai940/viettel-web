import { useState, useEffect } from "react"
import API from "../services/api"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./Admin.css"

function Packages() {

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const [name, setName] = useState("")
    const [data, setData] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")
    const [smsCode, setSmsCode] = useState("")

    const [description, setDescription] = useState("")
    const [banner, setBanner] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [advancedPackages, setAdvancedPackages] = useState([
        { name: "", data: "", price: "", duration: "", sms_code: "" }
    ])
    const [advancedIntro, setAdvancedIntro] = useState("")

    // ⭐ RICH CONTENT
    const [detailInfo, setDetailInfo] = useState("")
    const [condition, setCondition] = useState("")
    const [registerGuide, setRegisterGuide] = useState("")
    const [benefit, setBenefit] = useState("")
    const [manageGuide, setManageGuide] = useState("")

    const [loading, setLoading] = useState(false)

    // ⭐ upload state
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const res = await API.get("/categories")
        setCategories(res.data)
    }

    // ⭐ FUNCTION UPLOAD ẢNH
    const uploadImage = async (file) => {

        const formData = new FormData()
        formData.append("image", file)

        setUploading(true)

        const res = await API.post("/upload", formData)

        setUploading(false)

        return res.data.url
    }

    // ⭐ HANDLE CHỌN ẢNH → CHÈN VÀO EDITOR
    const handleInsertImage = async (e) => {

        const file = e.target.files[0]
        if (!file) return

        const url = await uploadImage(file)

        // chèn ảnh vào editor
        setDetailInfo(prev =>
            prev + `<p><<img src="${url}" /></p>`
        )
    }

    const createPackage = async () => {

        if (!selectedCategory || !name) {
            alert("Nhập tên + chọn danh mục")
            return
        }

        setLoading(true)

        try {

            const fullContent = `
                <h2>Thông tin chi tiết gói cước</h2>
                ${detailInfo}

                <h2>Điều kiện đăng ký</h2>
                ${condition}

                <h2>Cách đăng ký</h2>
                ${registerGuide}

                <h2>Lợi ích khi sử dụng</h2>
                ${benefit}

                <h2>Cách quản lý gói</h2>
                ${manageGuide}
            `

            await API.post("/packages", {
                name,
                data,
                price: parseInt(price),
                duration,
                sms_code: smsCode,
                category: selectedCategory,
                description,
                banner,
                video_url: videoUrl,
                content: fullContent,
                advanced_intro: advancedIntro,
                advanced_packages: advancedPackages,
            })

            alert("✅ Tạo gói thành công")

        } catch (err) {
            alert("❌ Lỗi tạo gói")
        }

        setLoading(false)
    }
    // ⭐ THÊM 1 GÓI NÂNG CAO
    const addAdvanced = () => {
        setAdvancedPackages([
            ...advancedPackages,
            { name: "", data: "", price: "", duration: "", sms_code: "" }
        ])
    }
    const updateAdvanced = (index, field, value) => {

        const list = [...advancedPackages]

        list[index][field] = value

        setAdvancedPackages(list)
    }
    const childCategories = categories.filter(c => c.parent)

    return (
        <div className="admin-card">

            <h1 className="card-title">Tạo gói cước</h1>

            <select
                className="input-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Chọn danh mục</option>
                {childCategories.map(c => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <input className="input-field" placeholder="Tên gói"
                value={name} onChange={e => setName(e.target.value)} />

            <input className="input-field" placeholder="Data"
                value={data} onChange={e => setData(e.target.value)} />

            <input className="input-field" placeholder="Giá"
                value={price} onChange={e => setPrice(e.target.value)} />

            <input className="input-field" placeholder="Thời hạn"
                value={duration} onChange={e => setDuration(e.target.value)} />

            <input className="input-field" placeholder="SMS"
                value={smsCode} onChange={e => setSmsCode(e.target.value)} />

            <input className="input-field" placeholder="Mô tả"
                value={description} onChange={e => setDescription(e.target.value)} />

            <input className="input-field" placeholder="Banner URL"
                value={banner} onChange={e => setBanner(e.target.value)} />

            <input className="input-field" placeholder="Video URL"
                value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />

            {/* ⭐ UPLOAD ẢNH CMS */}
            <div className="form-group">
                <label>Upload ảnh chèn nội dung</label>

                <input type="file" onChange={handleInsertImage} />

                {uploading && <p>Đang upload ảnh...</p>}
            </div>

            <h3>Thông tin chi tiết</h3>
            <ReactQuill theme="snow" value={detailInfo} onChange={setDetailInfo} />

            <h3>Điều kiện đăng ký</h3>
            <ReactQuill theme="snow" value={condition} onChange={setCondition} />

            <h3>Cách đăng ký</h3>
            <ReactQuill theme="snow" value={registerGuide} onChange={setRegisterGuide} />

            <h3>Lợi ích</h3>
            <ReactQuill theme="snow" value={benefit} onChange={setBenefit} />

            <h3>Cách quản lý</h3>
            <ReactQuill theme="snow" value={manageGuide} onChange={setManageGuide} />

            <h3 style={{ marginTop: 40 }}>
                Nội dung lựa chọn gói nâng cao
            </h3>

            <textarea
                className="input-field"
                style={{ height: 120 }}
                placeholder="Nhập đoạn mô tả giống Viettel..."
                value={advancedIntro}
                onChange={e => setAdvancedIntro(e.target.value)}
            />
            <h3 style={{ marginTop: 40 }}>Gói nâng cao</h3>

            {advancedPackages.map((item, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #eee",
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 15
                    }}
                >

                    <input
                        className="input-field"
                        placeholder="Tên gói (VD: 6T5G135)"
                        value={item.name}
                        onChange={e =>
                            updateAdvanced(index, "name", e.target.value)
                        }
                    />

                    <input
                        className="input-field"
                        placeholder="Dung lượng (VD: 720GB)"
                        value={item.data}
                        onChange={e =>
                            updateAdvanced(index, "data", e.target.value)
                        }
                    />

                    <input
                        className="input-field"
                        placeholder="Giá"
                        value={item.price}
                        onChange={e =>
                            updateAdvanced(index, "price", e.target.value)
                        }
                    />

                    <input
                        className="input-field"
                        placeholder="Thời hạn (VD: 6 tháng)"
                        value={item.duration}
                        onChange={e =>
                            updateAdvanced(index, "duration", e.target.value)
                        }
                    />

                    <input
                        className="input-field"
                        placeholder="SMS code"
                        value={item.sms_code}
                        onChange={e =>
                            updateAdvanced(index, "sms_code", e.target.value)
                        }
                    />

                </div>
            ))}

            <button
                type="button"
                className="btn"
                style={{ background: "#0ea5e9", color: "white" }}
                onClick={addAdvanced}
            >
                + Thêm gói nâng cao
            </button>
            <button className="btn btn-primary" onClick={createPackage}>
                {loading ? "Đang tạo..." : "Tạo gói"}
            </button>

        </div>
    )
}

export default Packages