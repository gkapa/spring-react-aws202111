import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import "styles/globalFont.css";
import "styles/globalStyle.css";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import * as gb from "styles/globalConsts";

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
import styled from "styled-components";

export default function App() {
  return (
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
  );
}

const MainContainerBox = styled.div`
  margin: 12px auto;
  padding: 24px 12px;
  width: 100%;
  max-width: ${gb.theme.layout.maxContentWidthPx}px;
  min-height: ${gb.theme.layout.minContentHeightVh}vh;
`;

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
