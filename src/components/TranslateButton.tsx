import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import FileSlice from "../store/FileSlice";
import Preload from "../constants/Preload";

function TranslateButton({ language }: { language: string }) {
  const {
    progress,
    to,
    translate,
    data: { bookPath, spines },
  } = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const onTranslate = useCallback(async () => {
    dispatch(FileSlice.actions.setProgress(true));

    const driver = Preload.translate[translate].driver;
    const jobs = driver.translateBook(language, to, bookPath, spines);

    for (const i in jobs) {
      const job = jobs[i];
      setState(job.name + " 중... (" + (i + 1) + "/" + jobs.length + ")");
      await job.execute();
    }

    dispatch(FileSlice.actions.setProgress(false));
    setState("");
  }, [dispatch, language, to, translate, bookPath, spines]);
  return (
    <>
      {progress && <State>{state}</State>}
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
const State = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1em;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
`;
export default TranslateButton;
