import React from 'react'
import Hello from './Hello'
import Info from './Info'
import { Carousel } from 'primereact/carousel'
// eslint-disable-next-line no-unused-vars
import { Project } from '../api/project'
import ProjectCard from './ProjectCard'
import faker from 'faker'

// const testProject: Project = {
//   _id: 'testProject',
//   owner: 'CoG',
//   title: 'Choice of the Dragon',
//   summary: 'Play as a fire-breathing dragon who sleeps on gold and kidnaps princesses for fun.',
//   imageUrl: 'https://www.choiceofgames.com/wp-content/uploads/2011/05/dragon_feature-e1405054723572.jpg',
//   createdAt: new Date()
// }

const generateProjects = (howMany: number): Project[] => (
  [...Array<Project>(howMany)].map(() => ({
    _id: faker.random.alphaNumeric(12),
    owner: faker.company.companyName(),
    title: faker.commerce.productName(),
    summary: faker.lorem.sentence(50, 100),
    imageUrl: 'https://www.choiceofgames.com/wp-content/uploads/2011/05/dragon_feature-e1405054723572.jpg',
    createdAt: faker.date.past()
  }))
)

const responsiveOptions = [
  {
    breakpoint: '1480px',
    numVisible: 3,
    numScroll: 2
  },
  {
    breakpoint: '1160px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '840px',
    numVisible: 1,
    numScroll: 1
  }
]

const App = () => {
  const projects = generateProjects(10)
  console.log(projects)

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <Hello />
      <Info />
      <Carousel
        value={projects}
        itemTemplate={(project: Project) => <ProjectCard project={project}/>}
        header={<h1>Featured Projects</h1>}
        numVisible={4}
        numScroll={2}
        autoplayInterval={8000}
        circular={true}
        responsiveOptions={responsiveOptions}
      />
    </div>
  )
}

export default App
