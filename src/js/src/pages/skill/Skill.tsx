import React from "react";
import { Box, Stack } from "@mui/material";
import TitleBox from "blocks/TitleBox";
import IntroBox from "blocks/IntroBox";

export default function Fun() {
  return (
    <Box sx={{ my: 4 }}>
      <TitleBox title="技術スタック"></TitleBox>
      <Stack spacing={4}>
        <IntroBox title="React" td="left">
          sdf
        </IntroBox>
        <IntroBox title="Java Spring" td="right">
          sdf
        </IntroBox>
        <IntroBox title="AWS" td="left">
          sdf
        </IntroBox>
        <IntroBox title="RDBMS" td="right">
          sdf
        </IntroBox>
        <IntroBox title="その他" td="left">
          sdf
        </IntroBox>
      </Stack>
    </Box>
  );
}
