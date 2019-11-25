import { Meteor } from "meteor/meteor";
import { Components } from "../both/api/components/components";
import { Nodes } from "../both/api/nodes/nodes";
import { Projects } from "../both/api/projects/projects";
import { Scenes } from "../both/api/scenes/scenes";
import { Variables } from "../both/api/variables/variables";

Meteor.publish("projects", function() {
  if (!this.userId) return this.ready();

  return Projects.find({ owner: this.userId }, { sort: { createdOn: 1 } });
});

Meteor.publish("scenes", function() {
  if (!this.userId) return this.ready();

  return Scenes.find({ owner: this.userId }, { sort: { createdOn: 1 } });
});

Meteor.publish("nodes", function() {
  if (!this.userId) return this.ready();

  return Nodes.find({ owner: this.userId }, { sort: { createdOn: 1 } });
});

Meteor.publish("components", function() {
  if (!this.userId) return this.ready();

  return Components.find({ owner: this.userId }, { sort: { order: -1 } });
});

Meteor.publish("variables", function() {
  if (!this.userId) return this.ready();

  return Variables.find({ owner: this.userId }, { sort: { order: -1 } });
});
