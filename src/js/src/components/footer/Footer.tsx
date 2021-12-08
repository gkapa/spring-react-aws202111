import React from "react";
import styled from "styled-components";
import { Box, Link, Stack } from "@mui/material";
import { theme, externalLinks } from "styles/globalConsts";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function fun() {
  return (
    <WrapperBox>
      <Stack spacing={2} direction="row">
        <Box>©2021 Han Sahyeon.</Box>
        <Box>
          <Link href={externalLinks.github} target="_blank" sx={{ color: "black" }}>
            <GitHubIcon />
          </Link>
        </Box>
      </Stack>
    </WrapperBox>
  );
}

const WrapperBox = styled(Box)`
  background: ${theme.navbar.bgColor};
  padding: 40px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;
