import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { AuthRoutes } from "./pages/Auth/Routes";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";
import { Homepage } from "./pages/Homepage";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

export const homepage = "/";
export const dashboard = "/dashboard";
export const project = "/project/:projectId";
export const scenes = "/scene/:sceneId";

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Switch>
            <Route exact path={homepage}>
              <Homepage />
            </Route>
            <PrivateRoute path={dashboard}>
              <Dashboard />
            </PrivateRoute>
            <AuthRoutes />
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>,
    document.getElementById("react-target")
  );
});
