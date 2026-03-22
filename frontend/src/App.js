import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Packages from "./admin/Packages";
import PackageList from "./admin/PackageList";
import AdminLayout from "./admin/AdminLayout"

import DashBoard from "./DashBoard/DashBoard";
import PlanDetail from "./Page/PlanDetail";
import AdminInternet from "./admin/AdminInternet";
import Internet from "./Page/Internet";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashBoard />} />
        <Route path="/plan/:id" element={<PlanDetail />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/internet" element={<Internet />} />

        <Route path="/admin" element={<AdminLayout />}>

          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/packages" element={<Packages />} />

          <Route path="/admin/packages/list" element={<PackageList />} />
          <Route path="/admin/internet" element={<AdminInternet />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;