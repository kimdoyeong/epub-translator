import React from "react";
import { Switch, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import LoadBookPage from "./LoadBookPage";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path={LoadBookPage.path} exact component={LoadBookPage} />
    </Switch>
  );
}

export default Routes;
