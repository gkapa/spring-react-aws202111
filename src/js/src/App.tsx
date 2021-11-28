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
import { styled } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainContainerBox>
      </AuthProvider>
    </BrowserRouter>
  );
}

const MainContainerBox = styled(Box)`
  margin: 0px auto;
  padding: 0px 0;
  width: 100%;
  max-width: ${gb.theme.maxContentWidth}px;
`;

// background: linear-gradient(335deg, rgba(255,140,107,1) 0%, rgba(255,228,168,1) 100%);

const GlobalStyle = createGlobalStyle`
body {
  background: url(/background/home-background.png);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
`;
