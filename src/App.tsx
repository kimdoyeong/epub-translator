import React from "react";
import Routes from "./pages/Routes";
import usePageHook from "./hooks/usePageHook";

function App() {
  usePageHook();
  return <Routes />;
}
export default App;
