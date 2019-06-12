import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './App'
import Auth from './Authentication'

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Auth />
      </Switch>
    </BrowserRouter>,
    document.getElementById('react-target')
  );
});