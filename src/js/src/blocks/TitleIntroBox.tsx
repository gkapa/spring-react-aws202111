import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface IProps {
  title: string;
  children: React.ReactNode;
}

export default function Fun(props: IProps) {
  return (
    <WrapperBox td={props} component="fieldset">
      <legend>
        <Box>{props.title}</Box>
      </legend>
      {props.children}
    </WrapperBox>
  );
}

const intorBoxBorderColor = "#00ADB5";
const intorBoxBodyColor = "#222831";

const WrapperBox = styled(Box)<any>`
  width: 100%;
  border: 3px solid ${intorBoxBorderColor};
  border-radius: 32px;
  padding: 12px 42px;
  background: ${intorBoxBodyColor};
  color: white;

  display: flex;
  flex-flow: column nowrap;

  legend {
    ${(props: any) =>
      props.td === "left"
        ? "transform: rotate(-10deg); margin-left: -1.2em;"
        : "transform: rotate(10deg); margin-left: auto; margin-right: -1.2em"};
    border: 4px solid ${intorBoxBorderColor};
    padding: 8px;
    background: ${intorBoxBodyColor};
    color: ${intorBoxBorderColor};
    font-weight: 700;
    font-size: 1.4em;
  }
`;
