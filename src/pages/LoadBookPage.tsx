import React from "react";
import { MdDonutLarge } from "react-icons/md";
import FullLayout from "../components/FullLayout";

function LoadBookPage() {
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
