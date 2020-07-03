import React from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";
import FullLayout from "../components/FullLayout";

function IndexPage() {
  return (
    <FullLayout>
      <DropZone>
        <MdFileUpload style={{ fontSize: 48 }} />
        <span style={{ marginTop: 16 }}>
          클릭해서 선택하거나 파일을 드래그 앤 드랍
        </span>
      </DropZone>
    </FullLayout>
  );
}

const DropZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
  box-sizing: border-box;
  border: 2px dotted gray;
  transition: background 1s;
  cursor: pointer;

  :hover {
    background: #eaeaea;
  }
`;

export default IndexPage;
