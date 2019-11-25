import assert from "assert";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Projects, INSERT, UPDATE, REMOVE } from "./projects";
import "./methods";
import { notAuthorized } from "../exceptions";

if (Meteor.isServer) {
  describe("Projects", () => {
    describe("methods", () => {
      const userId = Random.id();
      const otherUserId = Random.id();
      // Find the internal implementation of the task method so we can
      // test it in isolation
      const insert = Meteor.server.method_handlers[INSERT];
      const remove = Meteor.server.method_handlers[REMOVE];
      const update = Meteor.server.method_handlers[UPDATE];
      // Set up a fake method invocation that looks like what the method expects
      const invocation = { userId };
      const otherInvocation = { otherUserId };

      const projectProps = {
        owner: userId,
        name: "test name",
        author: "test author",
        createdOn: Date.now()
      };
      const unownedProjectProps = { ...projectProps, owner: otherUserId };
      let ownedProjectId;
      let unownedProjectId;

      beforeEach(() => {
        Projects.remove({});
        ownedProjectId = Projects.insert(projectProps);
        projectProps._id = ownedProjectId;
        unownedProjectId = Projects.insert(unownedProjectProps);
        unownedProjectProps._id = unownedProjectId;
      });

      it("can insert owned project", () => {
        // Run the method with `this` set to the fake invocation
        insert.apply(invocation, ["insert name", "insert author"]);

        // Verify that the method does what we expected
        assert.equal(Projects.find().count(), 3);
      });

      it("cannot insert unowned project", () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () => insert.apply(otherInvocation, ["insert name", "insert author"]),
          notAuthorized
        );

        // Verify that the method does what we expected
        assert.equal(Projects.find().count(), 2);
      });

      it("can delete owned project", () => {
        // Run the method with `this` set to the fake invocation
        remove.apply(invocation, [ownedProjectId]);

        // Verify that the method does what we expected
        assert.equal(Projects.find().count(), 1);
      });

      it("cannot delete unowned project", () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () => remove.apply(invocation, [unownedProjectId]),
          notAuthorized
        );

        // Verify that the method does what we expected
        assert.equal(Projects.find().count(), 2);
      });

      it("can update project name", () => {
        const newName = "hello world";
        const expected = {
          ...projectProps,
          name: newName
        };

        update.apply(invocation, [ownedProjectId, { name: newName }]);
        const updatedProject = Projects.findOne({ _id: ownedProjectId });

        // ensure only text changed
        assert.deepEqual(updatedProject, expected);
      });

      it("can update project author", () => {
        const newAuthor = "hello world";
        const expected = {
          ...projectProps,
          author: newAuthor
        };

        update.apply(invocation, [ownedProjectId, { author: newAuthor }]);
        const updatedProject = Projects.findOne({ _id: ownedProjectId });

        // ensure only text changed
        assert.deepEqual(updatedProject, expected);
      });

      it("cannot update unowned project name", () => {
        const newName = "hello world";
        const expected = unownedProjectProps;

        assert.throws(
          () => update.apply(invocation, [unownedProjectId, { name: newName }]),
          notAuthorized
        );
        const updatedProject = Projects.findOne({ _id: unownedProjectId });

        // ensure no data changed
        assert.deepEqual(updatedProject, expected);
      });

      it("cannot update unowned project author", () => {
        const newAuthor = "hello world";
        const expected = unownedProjectProps;

        assert.throws(
          () =>
            update.apply(invocation, [unownedProjectId, { author: newAuthor }]),
          notAuthorized
        );
        const updatedProject = Projects.findOne({ _id: unownedProjectId });

        // ensure no data changed
        assert.deepEqual(updatedProject, expected);
      });
    });
  });
}
