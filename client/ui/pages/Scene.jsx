import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import {
  LABEL,
  CHOICE,
  addNode,
  updateNodeParentId
} from '../../../both/api/nodes/nodes'
import { Scenes } from '../../../both/api/scenes/scenes'
import { Flowchart } from '../components/flowchart/Flowchart'
import { Page } from './Page'

const NONE = 'NONE'

class SceneUI extends Component {
  state = {
    mode: NONE,
    selected: null
  };

  nodeClicked = node => {
    const { scene } = this.props
    const { mode, selected } = this.state

    if (mode === LABEL) {
      if (selected && selected.type !== LABEL && node.type === LABEL) { updateNodeParentId(node._id, [...node.parentId, selected]) } else if (selected === node._id) { addNode(LABEL, 'new', scene._id, [node._id]) }
    } else if (mode === CHOICE) addNode(CHOICE, 'new', scene._id, node._id)
    else this.props.history.push(`/node/${node._id}`)

    this.setState({ selected: node._id })
  };

  render() {
    const { scene, nodes } = this.props
    const { mode } = this.state

    const dataLoaded = scene && nodes
    return (
      <Page>
        <div>
          <button
            type="submit"
            style={{ backgroundColor: mode === LABEL ? 'white' : 'grey' }}
            onClick={() => this.setState({ mode: LABEL })}
          >
            Label
          </button>
          <button
            type="submit"
            style={{ backgroundColor: mode === CHOICE ? 'white' : 'grey' }}
            onClick={() => this.setState({ mode: CHOICE })}
          >
            Choice
          </button>
          <button
            type="submit"
            style={{ backgroundColor: mode === NONE ? 'white' : 'grey' }}
            onClick={() => this.setState({ mode: NONE })}
          >
            Select
          </button>
        </div>
        {dataLoaded && (
          <Flowchart nodes={nodes} nodeClicked={this.nodeClicked} />
        )}
        {!dataLoaded && 'loading scene...'}
      </Page>
    )
  }
}

SceneUI.propTypes = {
  scene: PropTypes.object,
  nodes: PropTypes.array,
  history: PropTypes.object
}

SceneUI.defaultProps = {
  scene: null,
  nodes: null
}

const mapTrackerToProps = () => {
  // const { id } = useParams()
  const id = 'GqRW6yE24zxzTf9Ar'
  const scene = Scenes.findOne({ _id: id })
  return {
    scene,
    nodes: scene ? scene.nodes() : undefined
  }
}

export const Scene = withTracker(mapTrackerToProps)(withRouter(SceneUI))
