import assert from "assert";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Variables, INSERT, UPDATE, REMOVE } from "./variables";
import "./methods";
import { notValueized } from "../exceptions";

if (Meteor.isServer) {
  describe("Variables", () => {
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

      const variableProps = {
        owner: userId,
        projectId: Random.id(),
        sceneId: Random.id(),
        name: "test name",
        value: "test value",
        createdOn: Date.now()
      };
      const unownedVariableProps = { ...variableProps, owner: otherUserId };
      let ownedVariableId;
      let unownedVariableId;

      beforeEach(() => {
        Variables.remove({});
        ownedVariableId = Variables.insert(variableProps);
        variableProps._id = ownedVariableId;
        unownedVariableId = Variables.insert(unownedVariableProps);
        unownedVariableProps._id = unownedVariableId;
      });

      it("can insert owned variable", () => {
        // Run the method with `this` set to the fake invocation
        insert.apply(invocation, [
          Random.id(),
          Random.id(),
          "insert name",
          "insert value"
        ]);

        // Verify that the method does what we expected
        assert.equal(Variables.find().count(), 3);
      });

      it("cannot insert unowned variable", () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () =>
            insert.apply(otherInvocation, [
              Random.id(),
              Random.id(),
              "insert name",
              "insert value"
            ]),
          notValueized
        );

        // Verify that the method does what we expected
        assert.equal(Variables.find().count(), 2);
      });

      it("can delete owned variable", () => {
        // Run the method with `this` set to the fake invocation
        remove.apply(invocation, [ownedVariableId]);

        // Verify that the method does what we expected
        assert.equal(Variables.find().count(), 1);
      });

      it("cannot delete unowned variable", () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () => remove.apply(invocation, [unownedVariableId]),
          notValueized
        );

        // Verify that the method does what we expected
        assert.equal(Variables.find().count(), 2);
      });

      it("can update variable name", () => {
        const newName = "hello world";
        const expected = {
          ...variableProps,
          name: newName
        };

        update.apply(invocation, [ownedVariableId, { name: newName }]);
        const updatedVariable = Variables.findOne({ _id: ownedVariableId });

        // ensure only text changed
        assert.deepEqual(updatedVariable, expected);
      });

      it("can update variable value", () => {
        const newValue = "hello world";
        const expected = {
          ...variableProps,
          value: newValue
        };

        update.apply(invocation, [ownedVariableId, { value: newValue }]);
        const updatedVariable = Variables.findOne({ _id: ownedVariableId });

        // ensure only text changed
        assert.deepEqual(updatedVariable, expected);
      });

      it("cannot update unowned variable name", () => {
        const newName = "hello world";
        const expected = unownedVariableProps;

        assert.throws(
          () =>
            update.apply(invocation, [unownedVariableId, { name: newName }]),
          notValueized
        );
        const updatedVariable = Variables.findOne({ _id: unownedVariableId });

        // ensure no data changed
        assert.deepEqual(updatedVariable, expected);
      });

      it("cannot update unowned variable value", () => {
        const newValue = "hello world";
        const expected = unownedVariableProps;

        assert.throws(
          () =>
            update.apply(invocation, [unownedVariableId, { value: newValue }]),
          notValueized
        );
        const updatedVariable = Variables.findOne({ _id: unownedVariableId });

        // ensure no data changed
        assert.deepEqual(updatedVariable, expected);
      });
    });
  });
}
