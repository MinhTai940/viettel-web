import React, { useEffect, useState } from "react";
import "./Internet.css";
import CardInternet from "./CardInternet";
import Header from "../DashBoard/Header";
import Footer from "../DashBoard/Footer";
import API from "../services/api";

const CATEGORY_NAME = "Internet lắp đặt";
// ⭐ ĐỔI lại đúng tên category Internet trong Admin

const Internet = () => {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInternetPlans();
  }, []);

  const loadInternetPlans = async () => {
    try {

      const res = await API.get("/internet");

      // // ⭐ lọc đúng gói Internet
      // const internetPlans = res.data.filter(
      //   p => p.category?.name === CATEGORY_NAME
      // );

      setPlans(res.data);

    } catch (err) {
      console.log("Load Internet plans error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ⭐ GROUP theo category
  const groupedPlans = plans.reduce((acc, plan) => {

    const cateName = plan.category?.name || "Gói Internet"

    if (!acc[cateName]) {
      acc[cateName] = []
    }

    acc[cateName].push(plan)

    return acc

  }, {})

  const CATEGORY_DESC = {
    "Gói cước ưu đãi sốc":
      "Combo Wifi thế hệ thứ 6 (Wifi 6) kèm thiết bị mở rộng Mesh WiFi phủ sóng mạnh",

    // "Gói cước cá nhân siêu tiết kiệm":
    //   "Kết nối mượt mà cho không gian sống gọn, vừa đủ cho nhu cầu cá nhân",

    "Gói cước Camera gia đình an tâm":
      "Giải pháp internet + camera giúp bảo vệ ngôi nhà của bạn"
  }
  return (
    <div className="internet-page-wrapper">

      <Header />

      <main className="internet-container">


        {loading ? (

          <div className="internet-loading">
            Đang tải gói cước...
          </div>

        ) : plans.length === 0 ? (

          <div className="internet-empty">
            Không có gói Internet nào
          </div>

        ) : (

          <>
            {Object.keys(groupedPlans).map(cate => (

              <section key={cate} className="internet-section">

                <h2 className="internet-section-title">
                  {cate}
                </h2>
                <p className="internet-section-desc">
                  {CATEGORY_DESC[cate]}
                </p>

                <div className="internet-grid">

                  {groupedPlans[cate].map(p => (
                    <CardInternet key={p._id} data={p} />
                  ))}

                </div>

              </section>

            ))}
          </>

        )}

      </main>

      <Footer />

    </div>
  );
};

export default Internet;