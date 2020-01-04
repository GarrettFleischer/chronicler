import { Meteor } from 'meteor/meteor'
import { Components } from '../components/components'
import { Scenes } from '../scenes/scenes'
import { Nodes, INSERT, REMOVE, UPDATE, LABEL } from './nodes'
import { notAuthorized, noModify } from '../exceptions'

Nodes.helpers({
  scene () {
    return Scenes.findOne({ _id: this.sceneId })
  },
  children () {
    return Nodes.find({ parentId: this._id }).fetch()
  },
  components () {
    return Components.find({ nodeId: this._id }).fetch()
  }
})

Meteor.methods({
  [INSERT] (type, text, sceneId, parentId) {
    if (!this.userId) throw notAuthorized
    return Nodes.insert({
      owner: this.userId,
      createdOn: Date.now(),
      type,
      text,
      sceneId,
      parentId
    })
  },

  [UPDATE] (id, { text, parentId }) {
    if (text === undefined && parentId === undefined) throw noModify
    const node = Nodes.findOne({ _id: id })
    if (this.userId !== node.owner) throw notAuthorized
    if (parentId && node.type !== LABEL) throw noModify
    return Nodes.update({ _id: id }, { $set: { text, parentId } })
  },

  [REMOVE] (id) {
    const node = Nodes.findOne({ _id: id })
    if (this.userId !== node.owner) throw notAuthorized
    return Nodes.remove({ _id: id })
  }
})

Nodes.before.remove((userId, doc) => {
  Nodes.remove({ parentId: doc._id })
  Components.remove({ nodeId: doc._id })
})
