import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { AccountsReactComponent } from 'meteor/meteoreact:accounts'

class Authentication extends Component {

  render() {
    const arState = this.arState;

    return (
      <Switch>
        <Route exact path='/login' component={arState} />
        <Route exact path='/register' component={arState} />
        <Route exact path='/logout' component={arState} />
        <Route exact path='/forgot-password' component={arState} />
        <Route exact path='/change-password' component={arState} />
        <Route exact path='/reset-password/:token' component={arState} />
        <Route exact path='/resend-verification' component={arState} />
      </Switch>
    )
  }

  arState = ({ match, history }) => {
    const { path, params } = match

    if (this.props.userId && path === '/logout') {
      Meteor.logout();
    }

    // Cant change password if not logged in.
    if (this.props.userId && path !== '/change-password') {
      return (<Redirect to='/' />)
    }

    return (
      <AccountsReactComponent
        history={history}
        route={path}
        token={params.token} // for the reset-password route
      />
    )
  }
}

export default withTracker(() => {
  return {
    userId: Meteor.isServer ? null : Meteor.userId(),
  };
})(Authentication);