import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Schema from 'simpl-schema';
import { Id } from '../customTypes';


export const INSERT = 'scenes.insert';
export const UPDATE = 'scenes.update';
export const REMOVE = 'scenes.remove';

export const addScene = (name, projectId) => Meteor.call(INSERT, name, projectId);
export const UpdateSceneName = (id, name) => Meteor.call(UPDATE, id, { name });
export const UpdateSceneStart = (id, name) => Meteor.call(UPDATE, id, { name });
export const RemoveScene = (id) => Meteor.call(REMOVE, id);

export const SceneSchema = new Schema({
  name: String,
  projectId: Id,
  owner: Id,
  createdOn: Date,
});

export const Scenes = new Mongo.Collection('scenes');
Scenes.attachSchema(SceneSchema);
