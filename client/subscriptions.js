import { Meteor } from 'meteor/meteor'
import '../both/api'

Meteor.subscribe('projects')
Meteor.subscribe('scenes')
Meteor.subscribe('nodes')
Meteor.subscribe('components')
Meteor.subscribe('variables')
