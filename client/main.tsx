import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import App from '../imports/ui/App'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'))
})
