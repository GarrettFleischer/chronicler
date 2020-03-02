import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import App from '../imports/ui/App'
import 'primereact/resources/themes/nova-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'))
})
