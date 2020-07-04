import React from "react";
import styled from "styled-components";
import FullLayout from "../components/FullLayout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SelectTranslateAPI from "../components/SelectTranslateAPI";

function InfoPage() {
  const { title, language, cover } = useSelector(
    (state: RootState) => state.file.data
  );
  return (
    <FullLayout>
      <Layout>
        <div className="left">
          <img src={cover} alt={title} className="cover" />
        </div>
        <div className="right">
          <h1 className="title">{title}</h1>
          <div className="description">{language}</div>
          <SelectTranslateAPI />
        </div>
      </Layout>
    </FullLayout>
  );
}

InfoPage.path = "/info";

const Layout = styled.div`
  display: flex;
  .left {
    .cover {
      min-width: 100px;
      max-width: 150px;
      height: auto;
    }
  }
  .right {
    flex: 1;
    padding: 1em;
    box-sizing: border-box;
  }
`;
export default InfoPage;
