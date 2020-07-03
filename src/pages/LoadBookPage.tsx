import React, { useEffect } from "react";
import { MdDonutLarge } from "react-icons/md";
import FullLayout from "../components/FullLayout";
import Preload from "../constants/Preload";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import FileSlice from "../store/FileSlice";
import { useHistory } from "react-router-dom";
import InfoPage from "./Info";

function LoadBookPage() {
  const { file, data } = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const data = Preload.Parsing.parsingEpub(file);

    dispatch(FileSlice.actions.setData(data));
  }, [file]);

  useEffect(() => {
    if (data) history.replace(InfoPage.path);
  }, [data, history]);
  return (
    <FullLayout>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MdDonutLarge fontSize="3em" />
        <h3 style={{ marginLeft: "1em" }}>파일을 처리하는 중입니다...</h3>
      </div>
    </FullLayout>
  );
}

LoadBookPage.path = "/load-book";

export default LoadBookPage;
