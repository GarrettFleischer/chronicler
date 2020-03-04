import { Mongo } from 'meteor/mongo'
// eslint-disable-next-line no-unused-vars
import { ID } from './types'

export interface Link {
    _id: ID,
    title: string,
    url: string,
    createdAt: Date
}

export default new Mongo.Collection<Link>('links')
