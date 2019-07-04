import {
  Meteor
} from 'meteor/meteor';

import '../both/config';


function insertLink(title, url) {
  Links.insert({
    title,
    url,
    createdAt: new Date()
  });
}

Meteor.startup(() => {

});