import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import Auth from "./Authentication";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Auth />
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>,
    document.getElementById("react-target")
  );
});
