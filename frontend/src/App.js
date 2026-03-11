import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashBoard from "./DashBoard/DashBoard";
import PlanDetail from "./Page/PlanDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<DashBoard />} />

          {/* Trang chi tiết gói cước */}
          <Route path="/plan/:id" element={<PlanDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;