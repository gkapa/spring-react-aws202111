import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import "styles/globalFont.css";
import "styles/globalStyle.css";

import Navbar from "components/navbar/Navbar";
import Box from "@mui/material/Box";
import * as gb from "styles/globalConsts";

import AuthProvider from "components/auth/Auth";
import Home from "pages/home/Home";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import Regist from "pages/auth/Regist";
import NotFound from "pages/notFound/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <Box id="mainContent" sx={{ py: 2, mx: "auto", width: "100%", maxWidth: gb.theme.maxContentWidth }}>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/auth/signUp" element={<SignUp />} />
            <Route path="/auth/signIn" element={<SignIn />} />
            <Route path="/auth/regist" element={<Regist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
}
