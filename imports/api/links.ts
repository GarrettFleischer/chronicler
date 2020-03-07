import { Mongo } from 'meteor/mongo'
import { ID } from './types'

export interface Link {
    _id: ID,
    title: string,
    url: string,
    createdAt: Date
}

export default new Mongo.Collection<Link>('links')
