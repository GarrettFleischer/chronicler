import React from 'react'
import { withFormsy } from 'formsy-react'
import { TextField } from '@material-ui/core'

class FormEmailField extends React.Component {
  changeValue = event => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value)
  };

  render () {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage()
    const value = this.props.getValue() || ''
    const isValidValue = this.props.isValidValue(value)
    const { label, type, autoComplete, autoFocus, fullWidth } = this.props

    return (
      <TextField
        label={label}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        value={value}
        onChange={this.changeValue}
        error={!isValidValue}
        helperText={errorMessage}
      />
    )
  }
}

export default withFormsy(FormEmailField)
