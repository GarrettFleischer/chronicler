import React, { Fragment } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { loginPath } from "./pages/Auth/Routes";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (
        <Fragment>
          {!isAuthenticated && <Redirect to={loginPath} />}
          children
        </Fragment>
      )}
    />
  );
};

PrivateRoute.propTypes = { isAuthenticated: PropTypes.bool };

const mapTrackerToProps = () => ({
  isAuthenticated: Meteor.isServer ? false : Meteor.userId() ? true : false
});

export default withTracker(mapTrackerToProps)(PrivateRoute);
