import { Meteor } from 'meteor/meteor'
import { Projects } from '../projects/projects'
import { Variables, INSERT, REMOVE, UPDATE } from './variables'
import { notAuthorized } from '../exceptions'

Variables.helpers({
  project() {
    return Projects.findOne({ _id: this.projectId })
  }
})

Meteor.methods({
  [INSERT](projectId, sceneId, name, value) {
    if (!this.userId) throw notAuthorized

    return Variables.insert({
      owner: this.userId,
      createdOn: Date.now(),
      projectId,
      sceneId,
      name,
      value
    })
  },

  [UPDATE](id, { sceneId, name, value }) {
    const variable = Variables.findOne({ _id: id })
    if (this.userId !== variable.owner) throw notAuthorized
    return Variables.update(
      { _id: id },
      {
        $set: {
          sceneId,
          name,
          value
        }
      }
    )
  },

  [REMOVE](id) {
    const variable = Variables.findOne({ _id: id })
    if (this.userId !== variable.owner) throw notAuthorized
    return Variables.remove({ _id: id })
  }
})
