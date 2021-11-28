import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function Fun() {
  return (
    <Box>
      <IntroduceBox>
        <Box>
          <IntroTypo variant="h2" sx={{ textAlign: "left", ml: 4 }}>
            HAN SAHYEON
          </IntroTypo>
          <IntroTypo variant="h2" sx={{ textAlign: "right", mr: 4 }}>
            WEB DEVELOPER
          </IntroTypo>
        </Box>
      </IntroduceBox>
    </Box>
  );
}

const textStroke = "lightblue";

const IntroduceBox = styled(Box)`
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
  text-shadow: 1px 1px 0 ${textStroke}, -1px 1px 0 ${textStroke}, 1px -1px 0 ${textStroke}, -1px -1px 0 ${textStroke},
    0px 1px 0 ${textStroke}, 0px -1px 0 ${textStroke}, -1px 0px 0 ${textStroke}, 1px 0px 0 ${textStroke},
    2px 2px 0 ${textStroke}, -2px 2px 0 ${textStroke}, 2px -2px 0 ${textStroke}, -2px -2px 0 ${textStroke},
    0px 2px 0 ${textStroke}, 0px -2px 0 ${textStroke}, -2px 0px 0 ${textStroke}, 2px 0px 0 ${textStroke},
    1px 2px 0 ${textStroke}, -1px 2px 0 ${textStroke}, 1px -2px 0 ${textStroke}, -1px -2px 0 ${textStroke},
    2px 1px 0 ${textStroke}, -2px 1px 0 ${textStroke}, 2px -1px 0 ${textStroke}, -2px -1px 0 ${textStroke};
`;
