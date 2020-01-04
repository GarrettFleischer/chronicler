import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { addVariable, GLOBAL } from '../../../../both/api/variables/variables'
import { Variable } from './Variable'

export const Variables = ({ projectId, scenes, variables }) => (
  <Fragment>
    <div style={{ margin: 16 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => addVariable(projectId, GLOBAL, '', '')}
      >
        Create Variable
      </Button>
    </div>
    {variables.map(v => (
      <Variable key={v._id} scenes={scenes} variable={v} />
    ))}
  </Fragment>
)

Variables.propTypes = {
  projectId: PropTypes.string.isRequired,
  scenes: PropTypes.array.isRequired,
  variables: PropTypes.array.isRequired
}
