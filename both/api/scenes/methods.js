import { Meteor } from 'meteor/meteor'
import { LABEL, Nodes } from '../nodes/nodes'
import { Projects } from '../projects/projects'
import { Scenes, INSERT, REMOVE, UPDATE } from './scenes'
import { notAuthorized } from '../exceptions'

Scenes.helpers({
  project () {
    return Projects.findOne(this.projectId)
  },
  nodes () {
    return Nodes.find({ sceneId: this._id }).fetch()
  },
  startNode () {
    return Nodes.findOne({ sceneId: this._id, parentId: null })
  }
})

Meteor.methods({
  [INSERT] (name, projectId) {
    if (!this.userId) throw notAuthorized
    return Scenes.insert({
      owner: this.userId,
      createdOn: Date.now(),
      name,
      projectId
    })
  },

  [UPDATE] (id, { name }) {
    const scene = Scenes.findOne({ _id: id })
    if (this.userId !== scene.owner) throw notAuthorized
    return Scenes.update({ _id: id }, { $set: { name } })
  },

  [REMOVE] (id) {
    const scene = Scenes.findOne({ _id: id })
    if (this.userId !== scene.owner) throw notAuthorized
    return Scenes.remove({ _id: id })
  }
})

// eslint-disable-next-line func-names
Scenes.after.insert(userId => {
  // check the userId for when in unit testing mode
  if (userId !== undefined) {
    Nodes.insert({
      type: LABEL,
      owner: userId,
      text: 'start',
      sceneId: this._id,
      parentId: null,
      createdOn: Date.now()
    })
  }
})

Scenes.before.remove((userId, doc) => Nodes.remove({ sceneId: doc._id }))
