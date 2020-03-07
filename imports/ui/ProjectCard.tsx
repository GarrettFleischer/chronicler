import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@material-ui/core'
import { Project } from '../api/project'

type ProjectCardProps = {
    project: Project
}
const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Project Image"
          height='300px'
          width='300px'
          image={project.imageUrl}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {project.title}
          </Typography>
          <Box height={10}>
            <Typography variant="body2" color="textSecondary" component="p">
              {project.summary}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard
