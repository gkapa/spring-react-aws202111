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
          <div>
            <Typography variant="h4" color="primary" sx={{ ml: 12 }}>
              ログイン
            </Typography>
          </div>
          <div>
            <Typography variant="h6" sx={{ ml: 12, color: "Red" }}>
              *Access tokenは10秒、Refresh tokenは40秒で設定しています。
            </Typography>
          </div>
          <hr style={{ background: "#1976D2", marginBottom: "36px" }}></hr>
          <SignInForm></SignInForm>
        </Stack>
      </WrapperBox>
    </>
  );
}

const WrapperBox = styled(Box)`
  margin-top: ${theme.layout.pageMarginTopPx}px;
  padding: 24px 12px;

  background: white;
  border: 2px solid gray;
  border-radius: 42px;
`;
