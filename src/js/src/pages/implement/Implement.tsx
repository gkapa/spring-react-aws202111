import React from "react";
import { Box, Grid, Link } from "@mui/material";
import TitleBox from "blocks/TitleBox";
import ToolIntroBox from "blocks/ToolIntroBox";
// import { styled } from "@mui/material/styles";

export default function Fun() {
  return (
    <Box sx={{ my: 4, mx: 2 }}>
      <TitleBox title="作ってみた機能">本サイトに実装してみた機能です。</TitleBox>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <ToolIntroBox title="ログイン機能" image="/static/tool_intro/login.jpg" linkTo="/auth/signIn">
            会員登録、及びJWTを利用したログリン機能を実装してみました。
          </ToolIntroBox>
        </Grid>
        <Grid item xs={6} md={4}>
          <ToolIntroBox title="Google Maps api" image="/static/tool_intro/login.jpg" linkTo="/_/impl/googleMap">
            <Link href="https://react-google-maps-api-docs.netlify.app/">参考したページ(1)</Link>
            <Link href="https://github.com/google-map-react/google-map-react/issues/1016">(2)</Link>
          </ToolIntroBox>
        </Grid>
      </Grid>
    </Box>
  );
}

// const StyledBox = styled(Box)``;
