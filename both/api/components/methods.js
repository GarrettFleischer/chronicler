import { Meteor } from 'meteor/meteor'
import { Nodes } from '../nodes/nodes'
import { Components, INSERT, REMOVE, UPDATE } from './components'
import { noModify, notAuthorized } from '../exceptions'

Components.helpers({
  node() {
    return Nodes.findOne({ _id: this.nodeId })
  }
})

Meteor.methods({
  [INSERT](type, nodeId, order, data) {
    if (!this.userId) throw notAuthorized
    return Components.insert({
      owner: this.userId,
      createdOn: Date.now(),
      type,
      nodeId,
      order,
      data
    })
  },

  [UPDATE](id, { data, order }) {
    if (data === undefined && order === undefined) throw noModify
    const component = Components.findOne({ _id: id })
    if (this.userId !== component.owner) throw notAuthorized
    const updatedData = { ...(component ? component.data : {}), ...data }
    return Components.update({ _id: id }, { $set: { data: updatedData, order } })
  },

  [REMOVE](id) {
    const component = Components.findOne({ _id: id })
    if (this.userId !== component.owner) throw notAuthorized
    return Components.remove({ _id: id })
  }
})
