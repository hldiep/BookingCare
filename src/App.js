import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import Contact from "./components/Home/Contact";
import ServiceAll from "./components/Home/ServiceAll";
import Info from "./components/Home/Info";
import Doctors from "./components/Home/Doctors";
import DoctorDetail from "./components/Home/DoctorDetail";
import AppointmentPage from "./components/Form/AppointmentPage";
import RecoveryPassword from "./components/Login/RecoveryPassword";
import VerifyCode from "./components/Login/VerifyCode";
import NewPassword from "./components/Login/NewPassword";
import DepartmentPage from "./components/Home/DepartmentPage";

import Login from "./components/Login/Login";

import AdminDashboard from "./components/Manager/AdminDashboard";
import DoctorManager from "./components/Manager/DoctorManager";

import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import DoctorAddPage from "./components/Manager/DoctorAddPage";

function App() {
  return (
    <Routes>
      {/* Các trang không cần header/footer như login, forgot password */}
      <Route path="dang-nhap" element={<Login />} />
      <Route path="quen-mat-khau" element={<RecoveryPassword />} />
      <Route path="ma-xac-minh" element={<VerifyCode />} />
      <Route path="mat-khau-moi" element={<NewPassword />} />

      {/* Các route dùng UserLayout (có header/footer) */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="dich-vu" element={<ServiceAll />} />
        <Route path="chuyen-khoa" element={<DepartmentPage />} />
        <Route path="gioi-thieu" element={<Info />} />
        <Route path="bac-si" element={<Doctors />} />
        <Route path="bac-si/detail" element={<DoctorDetail />} />
        <Route path="dat-lich" element={<AppointmentPage />} />
      </Route>

      {/* Các route dùng AdminLayout (dashboard admin) */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="doctor" element={<DoctorManager />} />
        <Route path="doctor/add" element={<DoctorAddPage />} />
        {/* Thêm các route quản lý khác */}
      </Route>
    </Routes>
  );
}

export default App;
