import "./RegisterPopup.css"
import { useEffect, useState } from "react"

const RegisterPopup = ({ open, onClose, plan }) => {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])

    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")

    const [loadingDistrict, setLoadingDistrict] = useState(false)

    const [form, setForm] = useState({
        name: "",
        phone: "",
        province: "",
        district: "",
        address: ""
    })

    // ⭐ load tỉnh khi mở popup
    useEffect(() => {

        if (!open) return

        const loadProvince = async () => {
            try {
                const res = await fetch(
                    "https://provinces.open-api.vn/api/v1/p/"
                )

                const data = await res.json()

                setProvinces(data)

            } catch (err) {
                console.log("Lỗi load tỉnh", err)
            }
        }

        loadProvince()

    }, [open])



    // ⭐ chọn tỉnh → load huyện
    const handleProvinceChange = async (e) => {

        const code = e.target.value
        const text = e.target.selectedOptions[0].text

        setSelectedProvince(code)
        setSelectedDistrict("")
        setLoadingDistrict(true)

        setForm({
            ...form,
            province: text,
            district: ""
        })

        try {

            const res = await fetch(
                "https://provinces.open-api.vn/api/v1/p/" + code + "?depth=2"
            )

            const data = await res.json()

            setDistricts(data.districts || [])

        } catch (err) {
            console.log("Lỗi load huyện", err)
        }

        setLoadingDistrict(false)
    }



    // ⭐ submit form
    const submitRegister = async () => {

        if (!form.name) {
            alert("Nhập họ tên")
            return
        }

        if (!form.phone) {
            alert("Nhập số điện thoại")
            return
        }

        if (!form.province) {
            alert("Chọn tỉnh")
            return
        }

        try {

            await fetch(
                "http://localhost:5000/api/internet-orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...form,
                        planId: plan._id,
                        planName: plan.name
                    })
                }
            )

            alert("Đăng ký thành công")

            onClose()

            setForm({
                name: "",
                phone: "",
                province: "",
                district: "",
                address: ""
            })

            setSelectedProvince("")
            setSelectedDistrict("")
            setDistricts([])

        } catch (err) {

            alert("Lỗi gửi đăng ký")

        }
    }



    if (!open) return null


    return (
        <div className="popup-overlay">

            <div className="popup-box">

                <div
                    className="popup-close"
                    onClick={onClose}
                >
                    ×
                </div>

                <h2>Thông tin đặt mua</h2>

                <p className="popup-plan">
                    Gói đang chọn:
                    <b> {plan?.name}</b>
                </p>

                <input
                    placeholder="Nhập họ tên"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Nhập số điện thoại *"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value
                        })
                    }
                />

                {/* ⭐ TỈNH */}
                <select
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                >
                    <option value="">
                        Chọn tỉnh/thành phố *
                    </option>

                    {provinces.map(p => (
                        <option key={p.code} value={p.code}>
                            {p.name}
                        </option>
                    ))}
                </select>

                {/* ⭐ HUYỆN */}
                <select
                    value={selectedDistrict}
                    onChange={(e) => {

                        const text =
                            e.target.selectedOptions[0].text

                        setSelectedDistrict(e.target.value)

                        setForm({
                            ...form,
                            district: text
                        })
                    }}
                >
                    <option value="">
                        {loadingDistrict
                            ? "Đang tải huyện..."
                            : "Chọn quận/huyện *"}
                    </option>

                    {districts.map(d => (
                        <option key={d.code} value={d.code}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <input
                    placeholder="Nhập địa chỉ"
                    value={form.address}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            address: e.target.value
                        })
                    }
                />

                <div className="popup-actions">

                    <button
                        className="btn-outline"
                        onClick={onClose}
                    >
                        ĐÓNG
                    </button>

                    <button
                        className="btn-primary"
                        onClick={submitRegister}
                    >
                        XÁC NHẬN
                    </button>

                </div>

            </div>

        </div>
    )
}

export default RegisterPopup