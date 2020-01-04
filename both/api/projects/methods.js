import { Meteor } from "meteor/meteor";
import { Scenes } from "../scenes/scenes";
import { Variables } from "../variables/variables";
import { Projects, INSERT, REMOVE, UPDATE } from "./projects";
import { notAuthorized } from "../exceptions";
import { json } from "graphlib";

Projects.helpers({
  scenes() {
    return Scenes.find({ projectId: this._id }).fetch();
  },
  variables() {
    return Variables.find({ projectId: this._id }).fetch();
  }
});

Meteor.methods({
  [INSERT](name, author) {
    if (!this.userId) throw notAuthorized;
    const project = Projects.insert({
      owner: this.userId,
      createdOn: Date.now(),
      name,
      author
    });
    return project;
  },

  [UPDATE](id, { name, author }) {
    const project = Projects.findOne({ _id: id });
    if (this.userId !== project.owner) throw notAuthorized;
    return Projects.update(
      { _id: id },
      {
        $set: {
          name,
          author
        }
      }
    );
  },

  [REMOVE](id) {
    const project = Projects.findOne({ _id: id });
    if (this.userId !== project.owner) throw notAuthorized;

    Projects.remove({ _id: id });
  }
});

// Projects.after.insert((userId) => users.insert({
//   owner: userId,
//   projectId: IdToStr(this._id),
//   name: 'startup',
// }));

Projects.before.remove((userId, doc) => {
  Scenes.remove({ projectId: doc._id });
  Variables.remove({ projectId: doc._id });
});
