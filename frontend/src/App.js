import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Packages from "./admin/Packages";
import PackageList from "./admin/PackageList";
import AdminLayout from "./admin/AdminLayout";
import Internet from "./Page/Internet";
import DashBoard from "./DashBoard/DashBoard";
import Sim from "./Page/Sim";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashBoard />} />
        <Route path="/sim" element={<Sim />} />
        <Route path="/internet" element={<Internet />} />
        
        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>

          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/packages" element={<Packages />} />

          <Route path="/admin/packages/list" element={<PackageList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;