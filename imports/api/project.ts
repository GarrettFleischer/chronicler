import { Mongo } from 'meteor/mongo'
// eslint-disable-next-line no-unused-vars
import { ID } from './types'

export default new Mongo.Collection('projects')

export interface Project {
    _id: ID,
    owner: ID
    title: string,
    url: URL,
    createdAt: Date
}
