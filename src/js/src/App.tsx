import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Navbar from "layouts/navbar/Navbar";
import Footer from "layouts/footer/Footer";

import AuthProvider from "components/auth/Auth";
import Home from "pages/home/Home";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import Regist from "pages/auth/Regist";
import NotFound from "pages/notFound/NotFound";
import Skill from "pages/skill/Skill";
import Implement from "pages/implement/Implement";
import GoogleMap from "pages/implement/GoogleMap";
import { createGlobalStyle } from "styled-components";
import MainContainerBox from "layouts/main/MainContainerBox";
import { HelmetProvider } from "react-helmet-async";

import "styles/globalFont.css";
import "styles/globalStyle.css";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CssBaseline />
        <GlobalStyle />
        <AuthProvider>
          <Navbar />
          <MainContainerBox>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/signUp" element={<SignUp />} />
              <Route path="/auth/signIn" element={<SignIn />} />
              <Route path="/auth/regist" element={<Regist />} />
              <Route path="/_/skill" element={<Skill />} />
              <Route path="/_/impl" element={<Implement />} />
              <Route path="/_/impl/googleMap" element={<GoogleMap />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContainerBox>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

// background: linear-gradient(335deg, rgba(255,140,107,1) 0%, rgba(255,228,168,1) 100%);

const GlobalStyle = createGlobalStyle`
body {
  background: url(/static/background/home-background.png);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
`;
