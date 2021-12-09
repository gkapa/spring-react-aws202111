import React from "react";
import styled from "styled-components";
import { theme } from "styles/globalConsts";

interface IProps {
  children: React.ReactNode;
}

export default function Fun(props: IProps) {
  return <Wrapper>{props.children}</Wrapper>;
}

const Wrapper = styled.div`
  margin: 12px auto;
  margin-bottom: 0;
  padding: 0px 0px;
  max-width: ${theme.layout.maxContentWidthPx}px;
  min-height: ${theme.layout.minContentHeightVh}vh;
`;
