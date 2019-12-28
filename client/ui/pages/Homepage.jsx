import React from "react";
import { Button } from "@material-ui/core";
import { Page } from "./Page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { dashboard } from "../App";

export const Homepage = () => (
  <Page>
    Homepage
    <Link to={dashboard}>
      <Button>Dashboard</Button>
    </Link>
  </Page>
);
