import React from 'react'
import Hello from './Hello'
import Info from './Info'
// eslint-disable-next-line no-unused-vars
import { Project } from '../api/project'
import ProjectCard from './ProjectCard'

const testProject: Project = {
  _id: 'testProject',
  owner: 'CoG',
  title: 'Choice of the Dragon',
  summary: 'Play as a fire-breathing dragon who sleeps on gold and kidnaps princesses for fun.',
  imageUrl: 'https://www.choiceofgames.com/wp-content/uploads/2011/05/dragon_feature-e1405054723572.jpg',
  createdAt: new Date()
}

const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
    <ProjectCard project={testProject}/>
  </div>
)

export default App
