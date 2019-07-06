import { Meteor } from 'meteor/meteor';

export const notAuthorized = new Meteor.Error('not-authorized');
export const noModify = new Meteor.Error('no-modify');