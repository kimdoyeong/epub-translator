import React from "react";
import styled, { createGlobalStyle } from "styled-components";

function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </>
  );
}

const Layout = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
`;

export default FullLayout;
