import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { Link as RouterLink } from "react-router-dom";

export default function Fun() {
  return (
    <WrapperBox>
      <h1>Hello, Wolrd!</h1>
    </WrapperBox>
  );
}

const WrapperBox = styled(Box)``;
