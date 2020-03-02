import React from 'react'
import Hello from './Hello'
import Info from './Info'
import { Page } from 'react-onsenui'

const App = () => (
  <Page>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
  </Page>
)

export default App
