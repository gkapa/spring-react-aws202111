import React from "react";
import { Box, Grid } from "@mui/material";
import TitleBox from "blocks/TitleBox";
import ToolIntroBox from "blocks/ToolIntroBox";
// import { styled } from "@mui/material/styles";

export default function Fun() {
  React.useEffect(() => {
    console.log("...........");
    console.log(process.env.REACT_APP_SERVICE_VERSION);
  }, []);

  return (
    <Box sx={{ my: 4, mx: 2 }}>
      <TitleBox title="作ってみた機能">本サイトに実装してみた機能です。</TitleBox>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <ToolIntroBox title="ログイン機能" image="/tool_intro/login.jpg" linkTo="/auth/signIn">
            会員登録、及びJWTを利用したログリン機能を実装してみました。
          </ToolIntroBox>
        </Grid>
        <Grid item xs={6} md={4}>
          <ToolIntroBox title="xx" image="/tool_intro/login.jpg" linkTo="/">
            sdf
          </ToolIntroBox>
        </Grid>
      </Grid>
    </Box>
  );
}

// const StyledBox = styled(Box)``;
