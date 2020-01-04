/* eslint-disable no-undef */
import assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { Scenes, INSERT, UPDATE, REMOVE } from './scenes'
import './methods'
import { notAuthorized } from '../exceptions'

if (Meteor.isServer) {
  describe('Scenes', () => {
    describe('methods', () => {
      const userId = Random.id()
      const otherUserId = Random.id()
      // Find the internal implementation of the task method so we can
      // test it in isolation
      const insert = Meteor.server.method_handlers[INSERT]
      const remove = Meteor.server.method_handlers[REMOVE]
      const update = Meteor.server.method_handlers[UPDATE]
      // Set up a fake method invocation that looks like what the method expects
      const invocation = { userId }
      const otherInvocation = { otherUserId }

      const sceneProps = {
        owner: userId,
        name: 'test name',
        projectId: Random.id(),
        createdOn: Date.now()
      }
      const unownedSceneProps = { ...sceneProps, owner: otherUserId }
      let ownedSceneId
      let unownedSceneId

      beforeEach(() => {
        Scenes.remove({})
        Meteor.userId = userId
        ownedSceneId = Scenes.insert(sceneProps)
        sceneProps._id = ownedSceneId
        unownedSceneId = Scenes.insert(unownedSceneProps)
        unownedSceneProps._id = unownedSceneId
      })

      it('can insert owned scene', () => {
        // Run the method with `this` set to the fake invocation
        insert.apply(invocation, ['insert name', Random.id()])

        // Verify that the method does what we expected
        assert.equal(Scenes.find().count(), 3)
      })

      it('cannot insert unowned scene', () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () => insert.apply(otherInvocation, ['insert name', Random.id()]),
          notAuthorized
        )

        // Verify that the method does what we expected
        assert.equal(Scenes.find().count(), 2)
      })

      it('can delete owned scene', () => {
        // Run the method with `this` set to the fake invocation
        remove.apply(invocation, [ownedSceneId])

        // Verify that the method does what we expected
        assert.equal(Scenes.find().count(), 1)
      })

      it('cannot delete unowned scene', () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () => remove.apply(invocation, [unownedSceneId]),
          notAuthorized
        )

        // Verify that the method does what we expected
        assert.equal(Scenes.find().count(), 2)
      })

      it('can update scene name', () => {
        const newName = 'hello world'
        const expected = {
          ...sceneProps,
          name: newName
        }

        update.apply(invocation, [ownedSceneId, { name: newName }])
        const updatedScene = Scenes.findOne({ _id: ownedSceneId })

        // ensure only text changed
        assert.deepEqual(updatedScene, expected)
      })

      it('cannot update unowned scene name', () => {
        const newName = 'hello world'
        const expected = unownedSceneProps

        assert.throws(
          () => update.apply(invocation, [unownedSceneId, { name: newName }]),
          notAuthorized
        )
        const updatedScene = Scenes.findOne({ _id: unownedSceneId })

        // ensure no data changed
        assert.deepEqual(updatedScene, expected)
      })
    })
  })
}
