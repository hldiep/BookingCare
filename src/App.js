import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import Contact from "./components/Home/Contact";
import ScrollToTop from "./ScrollToTop";
import ServiceAll from "./components/Home/ServiceAll";
import Login from "./components/Login/Login";
import Info from "./components/Home/Info";
import Doctors from "./components/Home/Doctors";
import ScrollToTopButton from "./components/Helper/ScrollToTopButton";
import HotlineButton from "./components/Helper/HotlineButton";
import DoctorDetail from "./components/Home/DoctorDetail";
import AppointmentPage from "./components/Form/AppointmentPage";
import RecoveryPassword from "./components/Login/RecoveryPassword";
import VerifyCode from "./components/Login/VerifyCode";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/dich-vu" element={<ServiceAll />} />
        <Route path="/gioi-thieu" element={<Info />} />
        <Route path="/bac-si" element={<Doctors />} />
        <Route path="/bac-si/detail" element={<DoctorDetail />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/quen-mat-khau" element={<RecoveryPassword />} />
        <Route path="/ma-xac-minh" element={<VerifyCode />} />
        <Route path="/dat-lich" element={<AppointmentPage />} />
      </Routes>
      <Footer />
      <HotlineButton />
      <ScrollToTopButton />
    </div>
  );
}

export default App;