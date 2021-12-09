import React from "react";
import SignInForm from "components/form/SignInForm";
import { Stack, Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { app } from "styles/globalConsts";
import { styled } from "@mui/material/styles";
import { theme } from "styles/globalConsts";

export default function Fun() {
  return (
    <>
      <Helmet>
        <title>ログイン{app.title}</title>
      </Helmet>
      <WrapperBox>
        <Stack spacing={3}>
          <Typography variant="h4" component="div" color="primary" sx={{ ml: 12 }}>
            ログイン
          </Typography>
          <hr style={{ background: "#1976D2", marginBottom: "36px" }}></hr>
          <SignInForm></SignInForm>
        </Stack>
      </WrapperBox>
    </>
  );
}

const WrapperBox = styled(Box)`
  margin-top: ${theme.layout.pageMarginTopPx}px;
`;
