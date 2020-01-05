import React from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'
import { homepageRoute } from '../../App'
import { Meteor } from 'meteor/meteor'

const Logout = () => {
  Meteor.logout()
  return <Redirect to={homepageRoute} />
}

export const loginPath = '/login'
export const registerPath = '/register'
export const logoutPath = '/logout'

export const AuthRoutes = () => (
  <Switch>
    <Route exact path={loginPath} component={Login} />
    <Route exact path={registerPath} component={Register} />
    <Route exact path={logoutPath} component={Logout} />
    {/*
        <Route exact path="/forgot-password" component={Homepage} />
        <Route exact path="/change-password" component={Homepage} />
        <Route exact path="/reset-password/:token" component={Homepage} />
        <Route exact path="/resend-verification" component={Homepage} /> */}
  </Switch>
)

// class Authentication extends Component {
//   render() {
//     return (
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/register" component={Register} />
//         {/* <Route exact path="/logout" component={Homepage} />
//         <Route exact path="/forgot-password" component={Homepage} />
//         <Route exact path="/change-password" component={Homepage} />
//         <Route exact path="/reset-password/:token" component={Homepage} />
//         <Route exact path="/resend-verification" component={Homepage} /> */}
//       </Switch>
//     );
//   }
// }

//   arState = ({ match, history }) => {
//     const { path, params } = match

//     if (this.props.userId && path === '/logout') {
//       Meteor.logout();
//     }

//     // Cant change password if not logged in.
//     if (this.props.userId && path !== '/change-password') {
//       return (<Redirect to='/' />)
//     }

//     return (
//       <AccountsReactComponent
//         history={history}
//         route={path}
//         token={params.token} // for the reset-password route
//       />
//     )
//   }
// }

// export default withTracker(() => {
//   return {
//     userId: Meteor.isServer ? null : Meteor.userId(),
//   };
// })(Authentication);
