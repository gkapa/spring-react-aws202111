import React from "react";
import styled from "styled-components";

interface IProps {
  showModal: () => void;
}

export default function fun(props: IProps) {
  return <Wrapper>sdf</Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(240, 240, 240, 0.9);
  padding: 50px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
