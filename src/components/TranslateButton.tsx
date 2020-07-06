import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useTranslate from "../hooks/useTranslate";

function TranslateButton() {
  const { progress } = useSelector((state: RootState) => state.file);
  const onTranslate = useTranslate();

  return (
    <>
      <Button disabled={progress} onClick={onTranslate}>
        {!progress ? "번역하기" : "번역 중..."}
      </Button>
    </>
  );
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
