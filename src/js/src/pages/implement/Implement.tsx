import React from "react";
import { Box, Grid } from "@mui/material";
import TitleBox from "blocks/TitleBox";
import ToolIntroBox from "blocks/ToolIntroBox";
import { Helmet } from "react-helmet-async";
import { app } from "styles/globalConsts";

export default function Fun() {
  return (
    <>
      <Helmet>
        <title>作ってみた機能{app.title}</title>
      </Helmet>
      <Box sx={{ my: 4, mx: 2 }}>
        <TitleBox title="作ってみた機能">本サイトに実装してみた機能です。</TitleBox>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <ToolIntroBox title="ログイン機能" image="/static/tool_intro/login.jpg" linkTo="/auth/signIn">
              会員登録、及びJWTを利用したログリン機能を実装してみました。
            </ToolIntroBox>
          </Grid>
          <Grid item xs={6} md={4}>
            <ToolIntroBox title="Google Maps api" image="/static/tool_intro/google_map.jpg" linkTo="/_/impl/googleMap">
              Google Maps Apiを利用した簡単な距離計算機能です。
            </ToolIntroBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
