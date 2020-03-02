import { Mongo } from 'meteor/mongo'
// eslint-disable-next-line no-unused-vars
import { ID } from './types'

export default new Mongo.Collection('links')

export interface Link {
    _id: ID,
    title: string,
    url: string,
    createdAt: Date
}
