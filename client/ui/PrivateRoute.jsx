import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { login } from "./App";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: login,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = { isAuthenticated: PropTypes.bool };

const mapTrackerToProps = () => ({
  isAuthenticated: Meteor.isServer ? false : Meteor.userId() !== null
});

export default withTracker(mapTrackerToProps)(PrivateRoute);
