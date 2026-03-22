import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Packages from "./admin/Packages";
import PackageList from "./admin/PackageList";
import AdminLayout from "./admin/AdminLayout";
import AdminInternet from "./admin/AdminInternet";
import AdminSimList from "./admin/simlist";

import DashBoard from "./DashBoard/DashBoard";
import PlanDetail from "./Page/PlanDetail";
import Internet from "./Page/Internet";
import Sim from "./Page/Sim";
import InternetDetail from "./Page/InternetDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashBoard />} />
        <Route path="/plan/:id" element={<PlanDetail />} />
        <Route path="/internet" element={<Internet />} />
        <Route path="/sim" element={<Sim />} />
        <Route path="/internet/:id" element={<InternetDetail />} />

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/list" element={<PackageList />} />
          <Route path="internet" element={<AdminInternet />} />
          <Route path="sim" element={<AdminSimList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;