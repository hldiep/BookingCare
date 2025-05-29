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
import UserLayout from "./components/Layout/UserLayout";
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
import DoctorProfile from "./components/Doctor/DoctorProfile";
import Security from "./components/Doctor/Security";
import DoctorSchedule from "./components/Doctor/DoctorSchedule";
import LichKham from "./components/Doctor/LichKham";
import LichKhamChiTiet from "./components/Doctor/LichKhamChiTiet";
import ScrollToTop from "./ScrollToTop";
import ProfileEdit from "./components/Doctor/ProfileEdit";
import AppointmentSuccess from "./components/Form/AppointmentSuccess";
import Tongquan from "./components/Dashboard/Tongquan";
import ProtectedRoute from "./components/Helper/ProtectedRoute";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="dang-nhap" element={<Login />} />
        <Route path="quen-mat-khau" element={<RecoveryPassword />} />
        <Route path="ma-xac-minh" element={<VerifyCode />} />
        <Route path="mat-khau-moi" element={<NewPassword />} />

        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lien-he" element={<Contact />} />
          <Route path="dich-vu" element={<ServiceAll />} />
          <Route path="chuyen-khoa" element={<DepartmentPage />} />
          <Route path="gioi-thieu" element={<Info />} />
          <Route path="bac-si" element={<Doctors />} />
          <Route path="bac-si/detail/:id" element={<DoctorDetail />} />
          <Route path="dat-lich" element={<AppointmentPage />} />
          <Route path="appointment-success" element={<AppointmentSuccess />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['manage', 'doctor']}>
              <Tongquan />
            </ProtectedRoute>
          }
        />
        <Route path="doctor" element={<DoctorManagement />} />
        <Route path="doctor/detail-manage/:id" element={<DoctorDetailManager />} />
        <Route path="doctor/edit/:id" element={<DoctorEdit />} />
        <Route path="doctor/create" element={<DoctorCreate />} />

        <Route path="service" element={<ServiceManagement />} />
        <Route path="service/detail" element={<ServiceDetail />} />
        <Route path="service/edit/:id" element={<ServiceEdit />} />
        <Route path="service/create" element={<ServiceCreate />} />

        <Route path="clinic" element={<ClinicManagement />} />
        <Route path="clinic/edit/:id" element={<ClinicEdit />} />
        <Route path="clinic/detail" element={<ClinicDetail />} />
        <Route path="clinic/create" element={<ClinicCreate />} />

        <Route path="specialty" element={<SpecialtyManagement />} />
        <Route path="specialty/detail" element={<SpecialtyDetail />} />
        <Route path="specialty/edit/:id" element={<SpecialtyEdit />} />
        <Route path="specialty/create" element={<SpecialtyCreate />} />

        <Route path="appointment" element={<Appointment />} />
        <Route path="appointment/detail" element={<AppointmentDetail />} />

        <Route path="schedule" element={<ScheduleManagement />} />
        <Route path="schedule/detail/:id" element={<ScheduleDetail />} />

        <Route path="profile" element={<DoctorProfile />} />
        <Route path="profile/edit" element={<ProfileEdit />} />

        <Route path="security" element={<Security />} />
        <Route path="my-schedule" element={<LichKham />} />
        <Route path="my-appointments" element={<DoctorSchedule />} />
        <Route path="my-schedule/detail" element={<LichKhamChiTiet />} />
      </Routes>
    </>

  );
}

export default App;
