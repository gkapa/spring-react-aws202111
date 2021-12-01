import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps {
  title: string;
  // td: "left" | "right";
  children: React.ReactNode;
}

export default function Fun(props: IProps) {
  return (
    <TitleBox>
      <Typography variant="h2" gutterBottom sx={{ fontFamily: "Kaisei Decol" }}>
        {props.title}
      </Typography>
      <Typography variant="h6" gutterBottom sx={{}}>
        {props.children}
      </Typography>
    </TitleBox>
  );
}

const TitleBox = styled(Box)`
  // display: inline-block;
  padding: 8px;
  margin: 8px 0;
  margin-left: 16px;
`;
