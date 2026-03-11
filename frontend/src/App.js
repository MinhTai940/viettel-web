import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Packages from "./admin/Packages";
import PackageList from "./admin/PackageList";
import AdminLayout from "./admin/AdminLayout";

import Home from "./Page/Home";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Trang Home người dùng */}
        <Route path="/" element={<Home />} />

        {/* Trang login admin */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Layout Admin */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="packages" element={<Packages />} />

          <Route path="packages/list" element={<PackageList />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;