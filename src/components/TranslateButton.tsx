import React from "react";
import styled from "styled-components";

function TranslateButton() {
  return <Button>번역하기</Button>;
}

const Button = styled.button`
  display: block;
  padding: 1em 0.5em;
  background: #4545ed;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.5em;
  border: 0;
  margin-bottom: 0.5em;
  color: white;
`;
export default TranslateButton;
