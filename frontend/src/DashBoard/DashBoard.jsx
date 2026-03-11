import { useEffect, useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import PlanCard from '../Page/PlanCard';
import API from '../services/api';

const DashBoard = () => {

  const [isOpenThang, setIsOpenThang] = useState(true);
  const [isOpenNgay, setIsOpenNgay] = useState(true);
  const [isOpenKhac, setIsOpenKhac] = useState(true);

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {

    try {

      const res = await API.get("/packages");

      console.log("API packages:", res.data);

      if (Array.isArray(res.data)) {
        setPackages(res.data);
      } else {
        setPackages([]);
      }

    } catch (error) {

      console.error("Fetch packages error:", error);
      setPackages([]);

    }

  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'sans-serif' }}>
      <Header />
      <Banner />

      <div style={{ maxWidth: '1250px', margin: '40px auto', padding: '0 20px' }}>

        {/* ================= GÓI CƯỚC THÁNG ================= */}

        <div style={{ marginBottom: '20px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Gói cước tháng
            </h2>

            <button onClick={() => setIsOpenThang(!isOpenThang)}>
              ▼
            </button>
          </div>

          {isOpenThang && (

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

              {Array.isArray(packages) &&
                packages
                  .filter(p => p.duration && p.duration.includes("30"))
                  .map(plan => (

                    <PlanCard
                      key={plan._id}
                      id={plan._id}
                      planName={plan.name}
                      dataValue={plan.data}
                      dataDuration="/NGÀY"
                      price={plan.price}
                      priceDuration="/THÁNG"
                      smsCode={plan.sms_code}
                      hasCallIcon
                      hasTv360Icon
                      hasCloudIcon
                    />

                  ))
              }

            </div>

          )}

        </div>

        <hr />

        {/* ================= GÓI CƯỚC NGÀY ================= */}

        <div style={{ marginBottom: '20px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Gói cước ngày
            </h2>

            <button onClick={() => setIsOpenNgay(!isOpenNgay)}>
              ▼
            </button>
          </div>

          {isOpenNgay && (

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

              {Array.isArray(packages) &&
                packages
                  .filter(p => !p.duration || !p.duration.includes("30"))
                  .map(plan => (

                    <PlanCard
                      key={plan._id}
                      id={plan._id}
                      planName={plan.name}
                      dataValue={plan.data}
                      dataDuration="/NGÀY"
                      price={plan.price}
                      priceDuration={plan.duration}
                      smsCode={plan.sms_code}
                      hasCallIcon
                      hasTv360Icon
                      hasCloudIcon
                    />

                  ))
              }

            </div>

          )}

        </div>

        <hr />

        {/* ================= GÓI KHÁC ================= */}

        <div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Gói cước khác
            </h2>

            <button onClick={() => setIsOpenKhac(!isOpenKhac)}>
              ▼
            </button>
          </div>

          {isOpenKhac && (

            <div style={{ color: '#888' }}>
              (Nội dung các gói cước khác sẽ hiển thị ở đây...)
            </div>

          )}

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default DashBoard;