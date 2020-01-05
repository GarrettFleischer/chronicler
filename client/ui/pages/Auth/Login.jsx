import React, { Component as ReactComponent } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Button, InputLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import { PaperPage } from '../PaperPage'
import FormPasswordField from '../../components/FormPasswordField'
import { Redirect } from 'react-router-dom'
import { dashboardRoute } from '../../App'
import FormTextField from '../../components/FormTextField'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: { margin: theme.spacing(4) }
})

class LoginUI extends ReactComponent {
  state = { canSubmit: false, loginError: '' };

  enableButton = () => {
    this.setState({ ...this.state, canSubmit: true })
  };

  disableButton = () => {
    this.setState({ ...this.state, canSubmit: false })
  };

  submit = values => {
    Meteor.loginWithPassword(values.email, values.password, err => {
      this.setState({ ...this.state, loginError: err.reason })
    })
  };

  render() {
    const { canSubmit, loginError } = this.state
    const { classes, loggedIn } = this.props

    return (
      <PaperPage>
        {loggedIn && <Redirect to={dashboardRoute} />}
        <Formsy
          className={classes.root}
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <FormTextField
            name="email"
            label="Email"
            type="text"
            autoComplete="email"
            autoFocus
            fullWidth
            className={classes.margin}
            validations="isEmail"
            validationError="This is not a valid email"
            required
          />
          <FormPasswordField
            className={classes.margin}
            name="password"
            validations={{ minLength: 8, maxLength: 32 }}
            validationError="Password must be between 8 and 32 characters"
            required
          />
          <Button
            className={classes.margin}
            type="submit"
            variant="outlined"
            disabled={!canSubmit}
          >
            Login
          </Button>
          <InputLabel className={classes.margin} error>
            {loginError}
          </InputLabel>
        </Formsy>
      </PaperPage>
    )
  }
}

LoginUI.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool
}

const mapTrackerToProps = () => ({
  loggedIn: Meteor.userId() !== null
})

export const Login = withStyles(styles)(
  withTracker(mapTrackerToProps)(LoginUI)
)
