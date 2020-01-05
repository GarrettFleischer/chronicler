import React, { Component as ReactComponent } from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
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

class RegisterUI extends ReactComponent {
  state = { canSubmit: false, registerError: '' };

  enableButton = () => {
    this.setState({ ...this.state, canSubmit: true })
  };

  disableButton = () => {
    this.setState({ ...this.state, canSubmit: false })
  };

  submit = values => {
    Accounts.createUser(values, err => {
      this.setState({ ...this.state, registerError: err.reason })
    })
  };

  render() {
    const { canSubmit, registerError } = this.state
    const { classes, user } = this.props

    return (
      <PaperPage>
        {user && <Redirect to={dashboardRoute} />}
        <Formsy
          className={classes.root}
          onValidSubmit={this.submit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <FormTextField
            name="username"
            label="Username"
            type="text"
            autoFocus
            fullWidth
            className={classes.margin}
            validations={{ minLength: 3, maxLength: 32 }}
            validationError="Username must be between 3 and 32 characters"
            required
          />
          <FormTextField
            name="email"
            label="Email"
            type="text"
            autoComplete="email"
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
            Register
          </Button>
          <InputLabel className={classes.margin} error>
            {registerError}
          </InputLabel>
        </Formsy>
      </PaperPage>
    )
  }
}

RegisterUI.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.bool
}

const mapTrackerToProps = () => ({
  user: Meteor.user() !== null
})

export const Register = withStyles(styles)(
  withTracker(mapTrackerToProps)(RegisterUI)
)
