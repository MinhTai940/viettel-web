import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../services/api"
import PlanCard from "./PlanCard"
import "./PlanDetail.css"

function PlanDetail() {

  const { id } = useParams()

  const [plan, setPlan] = useState(null)
  const [relatedPlans, setRelatedPlans] = useState([])
  const [popup, setPopup] = useState(null)

  useEffect(() => {
    fetchPlan()
  }, [id])

  const fetchPlan = async () => {
    try {

      // ===== LẤY CHI TIẾT =====
      const res = await API.get(`/packages/${id}`)
      const currentPlan = res.data
      setPlan(currentPlan)

      // ===== LẤY CATEGORY ID CHUẨN =====
      const categoryId =
        typeof currentPlan.category === "object"
          ? currentPlan.category?._id
          : currentPlan.category

      // ===== LẤY TẤT CẢ GÓI =====
      const allRes = await API.get("/packages")

      const related = allRes.data.filter(p => {

        const pCategoryId =
          typeof p.category === "object"
            ? p.category?._id
            : p.category

        return (
          String(pCategoryId) === String(categoryId) &&
          String(p._id) !== String(id)
        )
      })

      setRelatedPlans(related.slice(0, 4))

    } catch (err) {
      console.log("Lỗi load plan:", err)
    }
  }

  if (!plan) {
    return <h2 style={{ padding: 40 }}>Đang tải gói cước...</h2>
  }

  return (
    <div className="plan-detail-container">

      {/* ===== BANNER ===== */}
      {plan.banner && (
        <img
          src={plan.banner}
          className="detail-banner"
          alt="banner"
        />
      )}

      {/* ===== TITLE ===== */}
      <h1 className="detail-title">
        Gói cước Viettel <span>{plan.name}</span>
      </h1>

      {/* ===== INFO BOX ===== */}
      <div className="detail-box-container">

        <div className="detail-box">
          <div className="detail-icon">💰</div>
          <div>
            <p>Cước phí</p>
            <h3>{Number(plan.price).toLocaleString()}đ</h3>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">⏱</div>
          <div>
            <p>Thời hạn sử dụng</p>
            <h3>{plan.duration} ngày</h3>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">📶</div>
          <div>
            <p>Dung lượng data</p>
            <h3>{plan.data}/ngày</h3>
          </div>
        </div>

      </div>

      {/* ===== DESCRIPTION ===== */}
      {plan.description && (
        <p className="detail-description">{plan.description}</p>
      )}

      {/* ===== HTML CONTENT ===== */}
      {plan.content && (
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: plan.content }}
        />
      )}

      {/* ===== ⭐ GÓI NÂNG CAO ===== */}
      {plan.advanced_packages?.length > 0 && (
        <div className="advanced-section">

          <h2>
            Lựa chọn nâng cao dành riêng cho gói {plan.name}
          </h2>

          <table className="advanced-table">

            <thead>
              <tr>
                <th>GÓI</th>
                <th>ƯU ĐÃI</th>
                <th>ĐƠN GIÁ</th>
                <th>ĐĂNG KÝ</th>
              </tr>
            </thead>

            <tbody>
              {plan.advanced_packages.map((ap, i) => (
                <tr key={i}>

                  <td>{ap.name}</td>

                  <td>
                    {ap.data}
                    <br />
                    (4GB/ngày)
                    <br />
                    Miễn phí TV360
                    <br />
                    Miễn phí Mybox
                  </td>

                  <td>
                    {Number(ap.price).toLocaleString()}đ
                    <br />
                    ({ap.duration})
                  </td>

                  <td>
                    <button
                      className="advanced-register-btn"
                      onClick={() => setPopup(ap)}
                    >
                      Đăng ký
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      {/* ===== VIDEO ===== */}
      {plan.video_url && (
        <div className="video-container">
          <iframe
            width="100%"
            height="420"
            src={plan.video_url.replace("watch?v=", "embed/")}
            title="video"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      {/* ===== ⭐ RELATED ===== */}
      {relatedPlans.length > 0 && (
        <div className="related-section">

          <h2>Gói cước tương tự</h2>

          <div className="related-grid">
            {relatedPlans.map(p => (
              <PlanCard
                key={p._id}
                id={p._id}
                planName={p.name}
                dataValue={p.data}
                dataDuration="/ngày"
                price={p.price}
                smsCode={p.sms_code}
                priceDuration={`/${p.duration} ngày`} />
            ))}
          </div>

        </div>
      )}

      {/* ===== ⭐ POPUP ===== */}
      {popup && (
        <div className="popup-overlay">
          <div className="popup-box">

            <h3>Thông báo</h3>

            <p>
              Để đăng ký gói cước vui lòng soạn tin:
              <br />
              <b>{popup.sms_code} UP gửi 290</b>
            </p>

            <button
              className="popup-btn"
              onClick={() => setPopup(null)}
            >
              Đóng
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default PlanDetail