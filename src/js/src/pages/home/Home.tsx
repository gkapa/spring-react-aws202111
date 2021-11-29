import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import IntroBox from "blocks/IntroBox";

export default function Fun() {
  return (
    <Box>
      <IntroCard>
        <Box>
          <IntroTypo variant="h2" sx={{ textAlign: "left", ml: 4 }}>
            HAN SAHYEON
          </IntroTypo>
          <IntroTypo variant="h2" sx={{ textAlign: "right", mr: 4 }}>
            WEB DEVELOPER
          </IntroTypo>
        </Box>
      </IntroCard>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <IntroBox title="React" td="left">
            <p>
              redux, redux saga, recoil 등의 상태관리 라이브러리 사용 경험이 있습니다. next.js를 활용한 SSR 개발 경험이
              있습니다.
            </p>
          </IntroBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <IntroBox title="React" td="right">
            <p>
              redux, redux saga, recoil 등의 상태관리 라이브러리 사용 경험이 있습니다. next.js를 활용한 SSR 개발 경험이
              있습니다.
            </p>
          </IntroBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <IntroBox title="React" td="left">
            <p>
              redux, redux saga, recoil 등의 상태관리 라이브러리 사용 경험이 있습니다. next.js를 활용한 SSR 개발 경험이
              있습니다.
            </p>
          </IntroBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <IntroBox title="React" td="left">
            <p>
              redux, redux saga, recoil 등의 상태관리 라이브러리 사용 경험이 있습니다. next.js를 활용한 SSR 개발 경험이
              있습니다.
            </p>
          </IntroBox>
        </Grid>
      </Grid>
    </Box>
  );
}

const textStrokeColor = "lightblue";

const IntroCard = styled(Box)`
  height: 80vh;
  min-height: 600px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: url(/background/coo-circle.png);
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
`;

const IntroTypo = styled(Typography)`
  color: rgba(76, 0, 0, 0.3);
  font-weight: 700;
  text-shadow: 1px 1px 0 ${textStrokeColor}, -1px 1px 0 ${textStrokeColor}, 1px -1px 0 ${textStrokeColor},
    -1px -1px 0 ${textStrokeColor}, 0px 1px 0 ${textStrokeColor}, 0px -1px 0 ${textStrokeColor},
    -1px 0px 0 ${textStrokeColor}, 1px 0px 0 ${textStrokeColor}, 2px 2px 0 ${textStrokeColor},
    -2px 2px 0 ${textStrokeColor}, 2px -2px 0 ${textStrokeColor}, -2px -2px 0 ${textStrokeColor},
    0px 2px 0 ${textStrokeColor}, 0px -2px 0 ${textStrokeColor}, -2px 0px 0 ${textStrokeColor},
    2px 0px 0 ${textStrokeColor}, 1px 2px 0 ${textStrokeColor}, -1px 2px 0 ${textStrokeColor},
    1px -2px 0 ${textStrokeColor}, -1px -2px 0 ${textStrokeColor}, 2px 1px 0 ${textStrokeColor},
    -2px 1px 0 ${textStrokeColor}, 2px -1px 0 ${textStrokeColor}, -2px -1px 0 ${textStrokeColor};
`;
