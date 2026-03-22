import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../services/api"
import Header from "../DashBoard/Header"
import Footer from "../DashBoard/Footer"
import "./InternetDetail.css"
import CardInternet from "./CardInternet"

const InternetDetail = () => {

    const { id } = useParams()

    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [relatedPlans, setRelatedPlans] = useState([])

    useEffect(() => {
        loadDetail()
    }, [id])

    const loadDetail = async () => {
        try {

            // ⭐ lấy detail
            const res = await API.get("/internet/" + id)
            const currentPlan = res.data
            setPlan(currentPlan)

            // ⭐ lấy tất cả gói
            const all = await API.get("/internet")

            // ⭐ lọc cùng category
            const related = all.data.filter(p =>
                p.category?._id === currentPlan.category?._id &&
                p._id !== currentPlan._id
            )

            setRelatedPlans(related)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Đang tải...</div>
    if (!plan) return <div>Không tìm thấy gói</div>

    return (
        <>
            <Header />

            <div className="internet-detail-container">

                <h1>
                    Gói Internet <span style={{ color: "red" }}>{plan.name}</span>
                </h1>

                <div className="internet-detail-box">

                    <hr />

                    {/* ⭐ nội dung chi tiết từ ReactQuill */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: plan.detail
                        }}
                    />

                </div>
                {relatedPlans.length > 0 && (

                    <div className="related-section">

                        <h2>GÓI CƯỚC TƯƠNG TỰ</h2>

                        <div className="related-grid">

                            {relatedPlans.map(p => (
                                <CardInternet key={p._id} data={p} />
                            ))}

                        </div>

                    </div>

                )}

            </div>

            <Footer />
        </>
    )
}

export default InternetDetail