import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/home/Home";
import Template from "pages/template/Template";

import Navbar from "components/navbar/Navbar";
import "styles/globalFont.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/template" element={<Template></Template>} />
      </Routes>
    </BrowserRouter>
  );
}
