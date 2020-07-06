import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { MdDone } from "react-icons/md";
import { RootState } from "../store";
import FileSlice from "../store/FileSlice";
import { useHistory } from "react-router-dom";

function TranslateState() {
  const { progress, progressState, done } = useSelector(
    (state: RootState) => state.file
  );
  const history = useHistory();
  const dispatch = useDispatch();
  if (progress) {
    return <State>{progressState}</State>;
  }

  function close() {
    dispatch(FileSlice.actions.setDone(false));
  }
  function goToMain() {
    dispatch(FileSlice.actions.clearFile());
    history.replace("/");
  }
  if (done) {
    return (
      <State>
        <MdDone /> 작업 완료
        <div className="actions">
          <button onClick={close}>닫기</button>
          <button onClick={goToMain}>메인으로</button>
        </div>
      </State>
    );
  }

  return null;
}

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

  .actions {
    display: inline-block;
    * {
      margin-left: 1em;
    }
    *::first-child {
      margin-left: 0;
    }
  }
`;
export default TranslateState;
