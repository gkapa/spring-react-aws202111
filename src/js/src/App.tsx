import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import "styles/globalFont.css";
import "styles/globalStyle.css";

import Navbar from "components/navbar/Navbar";
import Box from "@mui/material/Box";
import * as gb from "styles/globalConsts";

import Home from "pages/home/Home";
import Template from "pages/template/Template";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar></Navbar>
      <Box id="mainContent" sx={{ py: 2, mx: "auto", width: "100%", maxWidth: gb.theme.maxContentWidth }}>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/template" element={<Template></Template>} />
          <Route path="/template" element={<Template></Template>} />
          <Route path="/auth/signUp" element={<SignUp></SignUp>} />
          <Route path="/auth/signIn" element={<SignIn></SignIn>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
