import React from 'react'
import Hello from './Hello'
import Info from './Info'
import { Project } from '../api/project'
import ProjectCard from './ProjectCard'
import faker from 'faker'
import { Paper, GridList, GridListTile, Card, CardContent, Divider } from '@material-ui/core'
import { mapx } from '../utilities'
import { StoryEditor } from './StoryEditor'

// const testProject: Project = {
//   _id: 'testProject',
//   owner: 'CoG',
//   title: 'Choice of the Dragon',
//   summary: 'Play as a fire-breathing dragon who sleeps on gold and kidnaps princesses for fun.',
//   imageUrl: 'https://www.choiceofgames.com/wp-content/uploads/2011/05/dragon_feature-e1405054723572.jpg',
//   createdAt: new Date()
// }

const generateProjects = (howMany: number): Project[] => (
  mapx<Project>(() => ({
    _id: faker.random.alphaNumeric(12),
    owner: faker.company.companyName(),
    title: faker.commerce.productName(),
    summary: faker.lorem.sentence(50, 100),
    imageUrl: 'https://dummyimage.com/300',
    createdAt: faker.date.past()
  }), howMany)
)

const App = (): JSX.Element => {
  const projects = generateProjects(10)
  console.log(projects)

  document.body.className = 'bp3-dark'

  return (
    <div>
      <Paper>
        <Card>
          <CardContent>
            <StoryEditor/>
          </CardContent>
        </Card>
      </Paper>
      {/* <Paper>
        <h1>Welcome to Chronicler!</h1>
        <Hello />
        <Divider/>
        <Info />
        <Divider/>
        <Card>
          <CardContent>
            <StoryEditor/>
          </CardContent>
        </Card>
        <Divider/>
        <GridList cellHeight={400} cols={3}>
          {projects.map((project: Project) =>
            <GridListTile key={project._id}>
              <ProjectCard project={project}/>
            </GridListTile>)}
        </GridList>
      </Paper> */}
    </div>
  )
}

export default App
