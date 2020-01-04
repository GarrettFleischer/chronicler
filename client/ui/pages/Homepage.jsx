import React from 'react'
import { Button } from '@material-ui/core'
import { Page } from './Page'
import { Link } from 'react-router-dom'
import { dashboardRoute } from '../App'

export const Homepage = () => (
  <Page>
    Homepage
    <Link to={dashboardRoute}>
      <Button>Dashboard</Button>
    </Link>
  </Page>
)
