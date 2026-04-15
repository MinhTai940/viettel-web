import { useState, useEffect } from "react"
import API from "../services/api"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./Packages.css"

function Packages() {
    const [activeTab, setActiveTab] = useState("basic")
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [categories, setCategories] = useState([])
    const [emptyPackages, setEmptyPackages] = useState([])
    const [selectedId, setSelectedId] = useState("")

    // TAB 1: 7 trường cơ bản
    const [basic, setBasic] = useState({
        category: "", name: "", data: "", price: "", duration: "", smsCode: "", description: ""
    })

    // TAB 2: Tất cả phần còn lại từ file gốc của mày
    const [banner, setBanner] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [detailInfo, setDetailInfo] = useState("")
    const [condition, setCondition] = useState("")
    const [registerGuide, setRegisterGuide] = useState("")
    const [benefit, setBenefit] = useState("")
    const [manageGuide, setManageGuide] = useState("")
    const [advancedIntro, setAdvancedIntro] = useState("")
    const [advancedPackages, setAdvancedPackages] = useState([{ name: "", data: "", price: "", duration: "", sms_code: "" }])

    useEffect(() => {
        fetchCategories()
        if (activeTab === "detail") fetchEmptyPackages()
    }, [activeTab])

    const fetchCategories = async () => {
        const res = await API.get("/categories")
        setCategories(res.data)
    }

    const fetchEmptyPackages = async () => {
        const res = await API.get("/packages")
        setEmptyPackages(res.data.filter(p => !p.content || p.content.length < 50))
    }

    // ⭐ FUNCTION UPLOAD ẢNH (Từ file gốc)
    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)
        const res = await API.post("/upload", formData)
        setUploading(false)
        return res.data.url
    }

    const handleInsertImage = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const url = await uploadImage(file)
        setDetailInfo(prev => prev + `<p><img src="${url}" /></p>`)
    }

    // ⭐ XỬ LÝ TẠO GÓI BƯỚC 1
    const handleCreateBasic = async () => {
        if (!basic.category || !basic.name) return alert("Nhập tên + chọn danh mục")
        setLoading(true)
        try {
            await API.post("/packages", { ...basic, price: parseInt(basic.price), sms_code: basic.smsCode })
            alert("✅ Đã tạo xong khung! Hãy qua tab Chi tiết để hoàn thiện.")
            setActiveTab("detail")
        } catch (err) { alert("❌ Lỗi tạo gói") }
        setLoading(false)
    }

    // ⭐ XỬ LÝ HOÀN TẤT CHI TIẾT BƯỚC 2
    const handleUpdateDetail = async () => {
        if (!selectedId) return alert("Chọn gói cước cần thêm chi tiết!")
        setLoading(true)
        try {
            const fullContent = `
                <h2>Thông tin chi tiết gói cước</h2> ${detailInfo}
                <h2>Điều kiện đăng ký</h2> ${condition}
                <h2>Cách đăng ký</h2> ${registerGuide}
                <h2>Lợi ích khi sử dụng</h2> ${benefit}
                <h2>Cách quản lý gói</h2> ${manageGuide}
            `
            await API.put(`/packages/${selectedId}`, {
                banner, video_url: videoUrl, content: fullContent,
                advanced_intro: advancedIntro, advanced_packages: advancedPackages
            })
            alert("✅ Đã lưu toàn bộ thông tin chi tiết!")
            fetchEmptyPackages()
        } catch (err) { alert("❌ Lỗi lưu chi tiết") }
        setLoading(false)
    }

    const updateAdvanced = (index, field, value) => {
        const list = [...advancedPackages]; list[index][field] = value; setAdvancedPackages(list)
    }

    return (
        <div className="packages-container">
            <div className="tab-header">
                <button className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>1. Tạo gói cơ bản</button>
                <button className={`tab-btn ${activeTab === 'detail' ? 'active' : ''}`} onClick={() => setActiveTab('detail')}>2. Bổ sung chi tiết</button>
            </div>

            {activeTab === 'basic' ? (
                <div className="form-section">
                    <h2 style={{marginBottom: '24px'}}>📋 Thông tin cơ bản</h2>
                    <div className="input-grid">
                        <div className="input-group">
                            <label>Danh mục</label>
                            <select className="custom-select" value={basic.category} onChange={e => setBasic({...basic, category: e.target.value})}>
                                <option value="">📂 Chọn danh mục</option>
                                {categories.filter(c => c.parent).map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Tên gói</label>
                            <input className="custom-input" placeholder="VD: C120 MAX" value={basic.name} onChange={e => setBasic({...basic, name: e.target.value})} />
                        </div>
                    </div>
                    <div className="input-grid">
                        <div className="input-group">
                            <label>Dung lượng</label>
                            <input className="custom-input" placeholder="VD: 120GB" value={basic.data} onChange={e => setBasic({...basic, data: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>Giá</label>
                            <input className="custom-input" placeholder="VD: 120000" value={basic.price} onChange={e => setBasic({...basic, price: e.target.value})} />
                        </div>
                    </div>
                    <div className="input-grid">
                        <div className="input-group">
                            <label>Thời hạn</label>
                            <input className="custom-input" placeholder="VD: 30 ngày" value={basic.duration} onChange={e => setBasic({...basic, duration: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>SMS Code</label>
                            <input className="custom-input" placeholder="VD: SMS120" value={basic.smsCode} onChange={e => setBasic({...basic, smsCode: e.target.value})} />
                        </div>
                    </div>
                    <div className="input-group" style={{maxWidth: '500px'}}>
                        <label>Mô tả ngắn</label>
                        <textarea className="custom-textarea" placeholder="Gói cước tốc độ cao..." value={basic.description} onChange={e => setBasic({...basic, description: e.target.value})} />
                    </div>
                    <button className="btn-submit" style={{marginTop: '20px'}} onClick={handleCreateBasic}>🚀 Tạo gói bước 1</button>
                </div>
            ) : (
                <div className="form-section">
                    <h2 style={{marginBottom: '20px'}}>📝 Hoàn thiện nội dung & Gói nâng cao</h2>
                    <div className="input-group" style={{marginBottom: '32px'}}>
                        <label>Chọn gói cước cần thêm chi tiết</label>
                        <select className="custom-select" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                            <option value="">-- Chọn gói từ danh sách --</option>
                            {emptyPackages.map(p => <option key={p._id} value={p._id}>{p.name} - {p.price?.toLocaleString()}đ</option>)}
                        </select>
                    </div>

                    {selectedId && (
                        <>
                            <div className="input-grid">
                                <div className="input-group">
                                    <label>Banner URL</label>
                                    <input className="custom-input" value={banner} onChange={e => setBanner(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Video URL</label>
                                    <input className="custom-input" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
                                </div>
                            </div>

                            <div style={{marginBottom: '24px'}}>
                                <label style={{fontWeight: '700', color: '#e5002b', cursor: 'pointer'}}>📤 Upload ảnh vào chi tiết: </label>
                                <input type="file" onChange={handleInsertImage} />
                            </div>

                            <div className="quill-editor-wrapper">
                                <h3>📄 Thông tin chi tiết</h3>
                                <ReactQuill theme="snow" value={detailInfo} onChange={setDetailInfo} />
                            </div>
                            <div className="quill-editor-wrapper">
                                <h3>✅ Điều kiện đăng ký</h3>
                                <ReactQuill theme="snow" value={condition} onChange={setCondition} />
                            </div>
                            <div className="quill-editor-wrapper">
                                <h3>📖 Hướng dẫn đăng ký</h3>
                                <ReactQuill theme="snow" value={registerGuide} onChange={setRegisterGuide} />
                            </div>
                            <div className="quill-editor-wrapper">
                                <h3>⭐ Lợi ích sử dụng</h3>
                                <ReactQuill theme="snow" value={benefit} onChange={setBenefit} />
                            </div>
                            <div className="quill-editor-wrapper">
                                <h3>⚙️ Hướng dẫn quản lý</h3>
                                <ReactQuill theme="snow" value={manageGuide} onChange={setManageGuide} />
                            </div>

                            <div style={{background: '#fff5f5', padding: '24px', borderRadius: '16px', marginTop: '30px'}}>
                                <h3>⚡ Gói nâng cao (6T, 12T...)</h3>
                                <textarea className="custom-textarea" value={advancedIntro} onChange={e => setAdvancedIntro(e.target.value)} placeholder="Giới thiệu gói nâng cao..." />
                                {advancedPackages.map((adv, idx) => (
                                    <div key={idx} style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                                        <input className="custom-input" placeholder="Tên" value={adv.name} onChange={e => updateAdvanced(idx, 'name', e.target.value)} />
                                        <input className="custom-input" placeholder="Data" value={adv.data} onChange={e => updateAdvanced(idx, 'data', e.target.value)} />
                                        <input className="custom-input" placeholder="Giá" value={adv.price} onChange={e => updateAdvanced(idx, 'price', e.target.value)} />
                                        <input className="custom-input" placeholder="SMS" value={adv.sms_code} onChange={e => updateAdvanced(idx, 'sms_code', e.target.value)} />
                                    </div>
                                ))}
                                <button className="tab-btn" style={{color: '#0ea5e9'}} onClick={() => setAdvancedPackages([...advancedPackages, { name: "", data: "", price: "", duration: "", sms_code: "" }])}>+ Thêm dòng</button>
                            </div>

                            <div style={{textAlign: 'right', marginTop: '40px'}}>
                                <button className="btn-submit" onClick={handleUpdateDetail}>✅ Hoàn tất toàn bộ</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Packages