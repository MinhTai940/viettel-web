// src/components/Internet.jsx
import React, { useEffect, useState } from "react";
import "./Internet.css";
import CardInternet from "./CardInternet";
import Header from "../DashBoard/Header";
import Footer from "../DashBoard/Footer";
import API from "../services/api";   // ⭐ thêm API

const Internet = () => {

  // ⭐ state chứa danh sách gói
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ load dữ liệu từ backend
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get("/packages");
      setPlans(res.data);
    } catch (err) {
      console.log("Lỗi load packages:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="internet-page-wrapper">
      <Header />

      <main className="internet-container">

        <h2 className="section-title">
          Các gói cước Internet Cáp quang
        </h2>

        <hr className="title-separator" />

        <div className="internet-grid">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : plans.length > 0 ? (
            plans.map(plan => (
              <CardInternet key={plan._id} plan={plan} />
            ))
          ) : (
            <p>Không có gói cước nào</p>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Internet;