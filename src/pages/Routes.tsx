import React from "react";
import { Switch, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import LoadBookPage from "./LoadBookPage";
import InfoPage from "./InfoPage";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path={LoadBookPage.path} exact component={LoadBookPage} />
      <Route path={InfoPage.path} exact component={InfoPage} />
    </Switch>
  );
}

export default Routes;
