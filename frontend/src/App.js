
import './App.css';

import PlanCard from './Page/PlanCard';
import { monthlyPlans } from './Page/monthlyPlans';
import { Data4g } from './Page/Data4g';
import PlanDetail from "./Page/PlanDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div style={{ 
        display: 'flex', 
        gap: '60px 20px', 
        padding: '40px', 
        backgroundColor: '#f9f9f9', 
        minHeight: '100vh', 
        flexWrap: 'wrap',
        justifyContent: 'flex-start', /* SỬA Ở ĐÂY: Đổi center thành flex-start để ép các box dạt sang trái */
        maxWidth: '1400px',           /* THÊM VÀO: Giới hạn chiều rộng tổng để chứa vừa khít 4 box/hàng */
        margin: '0 auto'              /* THÊM VÀO: Canh giữa toàn bộ cụm danh sách trên màn hình lớn */
      }}> 
      {/* Vòng lặp lấy dữ liệu từ monthlyPlans mới */}
      {monthlyPlans.map((plan) => (
        <PlanCard 
          key={plan.id}
          planName={plan.planName}
          dataValue={plan.dataValue}
          dataUnit={plan.dataUnit}
          price={plan.price}
          hasCallIcon={plan.hasCallIcon}
          hasTv360Icon={plan.hasTv360Icon}
          hasCloudIcon={plan.hasCloudIcon}
        />
      ))}

      {Data4g.map((plan) => (
        <PlanCard 
          key={plan.id}
          planName={plan.planName}
          dataValue={plan.dataValue}
          dataUnit={plan.dataUnit}
          price={plan.price}
          hasCallIcon={plan.hasCallIcon}
          hasTv360Icon={plan.hasTv360Icon}
          hasCloudIcon={plan.hasCloudIcon}
        />
      ))}
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Data4g />} />
        <Route path="/plan/:id" element={<PlanDetail />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;