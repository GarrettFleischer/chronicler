import React, { Fragment } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { loginPath } from './pages/Auth/Routes'
import { Meteor } from 'meteor/meteor'

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest}>
      <Fragment>
        {!isAuthenticated && <Redirect to={loginPath} />}
        {isAuthenticated && children}
      </Fragment>
    </Route>
  )
}

PrivateRoute.propTypes = { children: PropTypes.element, isAuthenticated: PropTypes.bool }

const mapTrackerToProps = () => ({
  isAuthenticated: Meteor.isServer ? false : !!Meteor.userId()
})

export default withTracker(mapTrackerToProps)(PrivateRoute)
