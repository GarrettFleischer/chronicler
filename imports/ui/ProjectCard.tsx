import React from 'react'
import { Card } from 'primereact/card'
import { ScrollPanel } from 'primereact/scrollpanel'
// eslint-disable-next-line no-unused-vars
import { Project } from '../api/project'

const header = (url: string) => <img width='100%' alt="Project Image" src={url}/>

type ProjectCardProps = {
    project: Project
}
const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card style={{ width: '320px' }} title={project.title} header={header(project.imageUrl)} >
      <ScrollPanel style={{ width: '100%', height: '60px' }}>
        <h5>{project.summary}</h5>
      </ScrollPanel>
    </Card>
  )
}

export default ProjectCard
