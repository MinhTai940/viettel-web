import { useEffect, useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import PlanCard from '../Page/PlanCard';
import API from '../services/api';

const DashBoard = () => {

  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    fetchPackages();
    fetchCategories();
  }, []);

  const fetchPackages = async () => {
    const res = await API.get("/packages");
    setPackages(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const parentCategories = categories.filter(c => !c.parent);

  return (
    <div style={{ background: "#f9f9f9" }}>
      <Header />
      <Banner />

      <div style={{ maxWidth: 1250, margin: "40px auto" }}>

        {parentCategories.map(parent => {

          const childCategories = categories.filter(
            c => c.parent === parent._id
          );

          return (

            <div key={parent._id} style={{ marginBottom: 40 }}>

              {/* ⭐ HEADER DANH MỤC */}
              <div
                onClick={() => toggleSection(parent._id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  background: "#fff",
                  padding: "20px 25px",
                  borderRadius: 10,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >

                <h1 style={{ fontSize: 32, margin: 0 }}>
                  {parent.name}
                </h1>

                <div
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20
                  }}
                >
                  {openSection === parent._id ? "▲" : "▼"}
                </div>

              </div>

              {/* ⭐ HIỂN THỊ PLAN CARD */}
              {openSection === parent._id && (

                <div style={{ marginTop: 25 }}>

                  {childCategories.map(child => {

                    const childPackages = packages.filter(
                      p => p.category && p.category._id === child._id
                    );

                    if (childPackages.length === 0) return null;

                    return (

                      <div key={child._id} style={{ marginBottom: 35 }}>

                        <h2 style={{
                          marginBottom: 20,
                          marginLeft: 5
                        }}>
                          {child.name}
                        </h2>

                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 20
                        }}>

                          {childPackages.map(p => (

                            <PlanCard
                              key={p._id}
                              id={p._id}
                              planName={p.name}
                              dataValue={p.data}
                              dataDuration="/ngày"
                              price={p.price}
                              priceDuration={`/ ${p.duration} ngày`}
                              smsCode={p.sms_code}
                              hasCallIcon
                              hasTv360Icon
                              hasCloudIcon
                            />

                          ))}

                        </div>

                      </div>

                    )

                  })}

                </div>

              )}

            </div>

          )

        })}

      </div>

      <Footer />
    </div>
  );
};

export default DashBoard;