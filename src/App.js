import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import Contact from "./components/Home/Contact";
import ScrollToTop from "./ScrollToTop";
import ServiceAll from "./components/Home/ServiceAll";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/dich-vu" element={<ServiceAll />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;