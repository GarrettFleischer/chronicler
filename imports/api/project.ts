import { Mongo } from 'meteor/mongo'
import { ID } from './types'


export interface Project {
    _id: ID,
    owner: ID
    title: string,
    summary: string,
    imageUrl: string,
    createdAt: Date
}

export default new Mongo.Collection<Project>('projects')
