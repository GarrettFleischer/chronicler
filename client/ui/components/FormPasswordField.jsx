import React from 'react'
import { withFormsy } from 'formsy-react'
import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

class FormPasswordField extends React.Component {
  state = { showPassword: false };

  toggleShowPassword = () => {
    const { showPassword } = this.state
    this.setState({ ...this.state, showPassword: !showPassword })
  };

  changeValue = event => {
    this.props.setValue(event.currentTarget.value)
  };

  render () {
    const { showPassword } = this.state
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage()
    const value = this.props.getValue() || ''
    const isValidValue = this.props.isValidValue(value)

    return (
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        fullWidth
        required
        value={value}
        onChange={this.changeValue}
        error={!isValidValue}
        helperText={errorMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={this.toggleShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    )
  }
}

export default withFormsy(FormPasswordField)
