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
import HotlineButton from "./components/Home/HotlineButton";
import Doctors from "./components/Home/Doctors";

function App() {
  return (
    <div>
      <ScrollToTop />
      <HotlineButton />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/dich-vu" element={<ServiceAll />} />
        <Route path="/gioi-thieu" element={<Info />} />
        <Route path="/bac-si" element={<Doctors />} />
        <Route path="/dang-nhap" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;