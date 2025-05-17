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
import AdminDashboard from "./components/ManagerDoctor/AdminDashboard";
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import DoctorManagement from "./components/ManagerDoctor/DoctorManagement";
import DoctorDetailManager from "./components/ManagerDoctor/DoctorDetailManager";
import DoctorEdit from "./components/ManagerDoctor/DoctorEdit";
import DoctorCreate from "./components/ManagerDoctor/DoctorCreate";
import ServiceManagement from "./components/ManagerService/ServiceManagement";
import ServiceDetail from "./components/ManagerService/ServiceDetail";
import ServiceEdit from "./components/ManagerService/ServiceEdit";
import ServiceCreate from "./components/ManagerService/ServiceCreate";
import ClinicManagement from "./components/ManagerClinic/ClinicManagement";
import ClinicEdit from "./components/ManagerClinic/ClinicEdit";
import ClinicDetail from "./components/ManagerClinic/ClinicDetail";
import ClinicCreate from "./components/ManagerClinic/ClinicCreate";
import SpecialtyManagement from "./components/ManagerSpecialty/SpecialtyManagement";
import SpecialtyDetail from "./components/ManagerSpecialty/SpecialtyDetail";
import SpecialtyEdit from "./components/ManagerSpecialty/SpecialtyEdit";
import SpecialtyCreate from "./components/ManagerSpecialty/SpecialtyCreate";
import AppointmentDetail from "./components/ManagerApproval/AppointmentDetail";
import Appointment from "./components/ManagerApproval/Appointment";
import ScheduleManagement from "./components/ManagerSchedule/ScheduleManagement";
import ScheduleDetail from "./components/ManagerSchedule/ScheduleDetail";
import DoctorLayout from "./components/Layout/DoctorLayout";
import Manager from "./components/Doctor/DoctorManager";
import DoctorManager from "./components/Doctor/DoctorManager";
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

        <Route path="doctor" element={<DoctorManagement />} />
        <Route path="doctor/detail-manage" element={<DoctorDetailManager />} />
        <Route path="doctor/edit" element={<DoctorEdit />} />
        <Route path="doctor/create" element={<DoctorCreate />} />

        <Route path="service" element={<ServiceManagement />} />
        <Route path="service/detail" element={<ServiceDetail />} />
        <Route path="service/edit" element={<ServiceEdit />} />
        <Route path="service/create" element={<ServiceCreate />} />

        <Route path="clinic" element={<ClinicManagement />} />
        <Route path="clinic/edit" element={<ClinicEdit />} />
        <Route path="clinic/detail" element={<ClinicDetail />} />
        <Route path="clinic/create" element={<ClinicCreate />} />

        <Route path="specialty" element={<SpecialtyManagement />} />
        <Route path="specialty/detail" element={<SpecialtyDetail />} />
        <Route path="specialty/edit" element={<SpecialtyEdit />} />
        <Route path="specialty/create" element={<SpecialtyCreate />} />

        <Route path="appointment" element={<Appointment />} />
        <Route path="appointment/detail" element={<AppointmentDetail />} />

        <Route path="schedule" element={<ScheduleManagement />} />
        <Route path="schedule/detail" element={<ScheduleDetail />} />
      </Route>

      <Route path="/" element={<DoctorLayout />}>
        <Route index element={<Manager />} />
        <Route path="doctor/home" element={<DoctorManager />} />
        {/* <Route path="user" element={<Manager />} /> */}
        {/* <Route path="doctor/schedule" element={<ServiceAll />} /> */}

      </Route>
    </Routes>
  );
}

export default App;
