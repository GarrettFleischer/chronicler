import PropTypes from 'prop-types'
import React, { Component as ReactComponent, Fragment } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Projects } from '../../../../both/api/projects/projects'
import { PaperPage } from '../PaperPage'
import { Scenes } from './Scenes'
import { Variables } from './Variables'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'

class ProjectUI extends ReactComponent {
  state = { tab: 0 };

  tabChanged = (e, tab) => {
    this.setState({ tab })
  };

  render() {
    const { project, scenes, variables } = this.props
    const { tab } = this.state

    return (
      <Fragment>
        {project && (
          <PaperPage>
            <Tabs value={tab} onChange={this.tabChanged}>
              <Tab label="Scenes" />
              <Tab label="Variables" />
            </Tabs>
            {tab === 0 && <Scenes scenes={scenes} projectId={project._id} />}
            {tab === 1 && (
              <Variables
                scenes={scenes}
                projectId={project._id}
                variables={variables}
              />
            )}
          </PaperPage>
        )}
      </Fragment>
    )
  }
}

ProjectUI.propTypes = {
  project: PropTypes.object,
  scenes: PropTypes.array,
  variables: PropTypes.array
}

ProjectUI.defaultProps = {
  project: null,
  scenes: [],
  variables: []
}

const mapScenes = scenes =>
  scenes.map(scene => ({
    id: scene._id,
    text: scene.name,
    onClick: () => { } // FlowRouter.go(`/scene/${scene._id}`),
  }))

const mapTrackerToProps = () => {
  // const { id } = useParams()
  const id = 'GqRW6yE24zxzTf9Ar'
  const project = Projects.findOne({ _id: id })
  return {
    project,
    scenes: !project ? undefined : mapScenes(project.scenes()),
    variables: !project ? undefined : project.variables()
  }
}

export const Project = withTracker(mapTrackerToProps)(withRouter(ProjectUI))
