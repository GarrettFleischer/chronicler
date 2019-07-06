import assert from "assert";
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Nodes, REMOVE, UPDATE, LABEL, CHOICE } from './nodes';
import "./methods"
import { notAuthorized, noModify } from "../exceptions";

if (Meteor.isServer) {
    describe('Nodes', () => {
        describe('methods', () => {
            const userId = Random.id();
            const otherUserId = Random.id();
            // Find the internal implementation of the task method so we can
            // test it in isolation
            const remove = Meteor.server.method_handlers[REMOVE];
            const update = Meteor.server.method_handlers[UPDATE];
            // Set up a fake method invocation that looks like what the method expects
            const invocation = { userId };

            const parentId1 = Random.id();
            const parentId2 = Random.id();
            const nodeProps = {
                type: LABEL,
                owner: userId,
                text: "test label",
                sceneId: Random.id(),
                parentId: [parentId1, parentId2],
                createdOn: Date.now(),
            }
            const unownedNodeProps = { ...nodeProps, owner: otherUserId };
            const choiceNodeProps = { ...nodeProps, type: CHOICE };
            let ownedNodeId;
            let unownedNodeId;
            let choiceNodeId;

            beforeEach(() => {
                Nodes.remove({});
                ownedNodeId = Nodes.insert(nodeProps);
                nodeProps._id = ownedNodeId;
                unownedNodeId = Nodes.insert(unownedNodeProps);
                unownedNodeProps._id = unownedNodeId;
                choiceNodeId = Nodes.insert(choiceNodeProps);
                choiceNodeProps._id = choiceNodeId;
            });

            it('can delete owned node', () => {
                // Run the method with `this` set to the fake invocation
                remove.apply(invocation, [ownedNodeId]);

                // Verify that the method does what we expected
                assert.equal(Nodes.find().count(), 2);
            });

            it('cannot delete unowned node', () => {
                // Run the method with `this` set to the fake invocation
                assert.throws(() => remove.apply(invocation, [unownedNodeId]), notAuthorized);

                // Verify that the method does what we expected
                assert.equal(Nodes.find().count(), 3);
            });

            it('can update node text', () => {
                const newText = "hello world";
                const expected = {
                    ...nodeProps,
                    text: newText
                };

                update.apply(invocation, [ownedNodeId, { text: newText }]);
                const updatedComponent = Nodes.findOne({ _id: ownedNodeId });

                // ensure only data changed
                assert.deepEqual(updatedComponent, expected);
            });

            it('can update node parentId', () => {
                const newParentId = [parentId1, Random.id()];
                const expected = {
                    ...nodeProps,
                    parentId: newParentId
                };

                update.apply(invocation, [ownedNodeId, { parentId: newParentId }]);
                const updatedComponent = Nodes.findOne({ _id: ownedNodeId });

                // ensure only data changed
                assert.deepEqual(updatedComponent, expected);
            });

            it('cannot update node parentId of non-label', () => {
                const newParentId = [parentId1, Random.id()];
                const expected = choiceNodeProps;

                assert.throws(() => update.apply(invocation, [choiceNodeId, { parentId: newParentId }]), noModify);
                const updatedComponent = Nodes.findOne({ _id: choiceNodeId });

                // ensure only data changed
                assert.deepEqual(updatedComponent, expected);
            });

            it('cannot update unowned node text', () => {
                const newText = "hello world";
                const expected = unownedNodeProps;

                assert.throws(() => update.apply(invocation, [unownedNodeId, { text: newText }]), notAuthorized);
                const updatedComponent = Nodes.findOne({ _id: unownedNodeId });

                // ensure only data changed
                assert.deepEqual(updatedComponent, expected);
            });

            it('cannot update node type', () => {
                const newType = CHOICE
                const expected = nodeProps;

                assert.throws(() => update.apply(invocation, [ownedNodeId, { type: newType }]), noModify);
                const updatedComponent = Nodes.findOne({ _id: ownedNodeId });

                // ensure only only data changed
                assert.deepEqual(updatedComponent, expected);
            });
        });
    });
};
