/* eslint-disable no-undef */
import assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { Components, INSERT, REMOVE, TEXT, UPDATE, SET } from './components'
import './methods'
import { notAuthorized, noModify } from '../exceptions'

if (Meteor.isServer) {
  describe('Components', () => {
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

      const componentProps = {
        owner: userId,
        createdOn: Date.now(),
        type: SET,
        nodeId: Random.id(),
        order: 0,
        data: {
          value: 'test value',
          valueIsVariable: false
        }
      }
      const unownedComponentProps = { ...componentProps, owner: otherUserId }
      let unownedComponentId
      let ownedComponentId

      beforeEach(() => {
        Components.remove({})
        ownedComponentId = Components.insert(componentProps)
        componentProps._id = ownedComponentId
        unownedComponentId = Components.insert(unownedComponentProps)
        unownedComponentProps._id = unownedComponentId
      })

      it('can insert owned component', () => {
        // Run the method with `this` set to the fake invocation
        insert.apply(invocation, [
          TEXT,
          Random.id(),
          1,
          { text: 'insert text' }
        ])

        // Verify that the method does what we expected
        assert.equal(Components.find().count(), 3)
      })

      it('cannot insert unowned component', () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () =>
            insert.apply(otherInvocation, [
              TEXT,
              Random.id(),
              1,
              { text: 'insert text' }
            ]),
          notAuthorized
        )

        // Verify that the method does what we expected
        assert.equal(Components.find().count(), 2)
      })

      it('can delete owned component', () => {
        // Run the method with `this` set to the fake invocation
        remove.apply(invocation, [ownedComponentId])

        // Verify that the method does what we expected
        assert.equal(Components.find().count(), 1)
      })

      it('cannot delete unowned component', () => {
        // Run the method with `this` set to the fake invocation
        assert.throws(
          () => remove.apply(invocation, [unownedComponentId]),
          notAuthorized
        )

        // Verify that the method does what we expected
        assert.equal(Components.find().count(), 2)
      })

      it('can update component order', () => {
        const newOrder = 3
        const expected = { ...componentProps, order: newOrder }

        update.apply(invocation, [ownedComponentId, { order: newOrder }])
        const updatedComponent = Components.findOne({ _id: ownedComponentId })

        // ensure only only order changed
        assert.deepEqual(updatedComponent, expected)
      })

      it('can update component data', () => {
        const newData = { value: 'hello world' }
        const expected = {
          ...componentProps,
          data: { ...componentProps.data, ...newData }
        }

        update.apply(invocation, [ownedComponentId, { data: newData }])
        const updatedComponent = Components.findOne({ _id: ownedComponentId })

        // ensure only data changed
        assert.deepEqual(updatedComponent, expected)
      })

      it('cannot update unowned component data', () => {
        const newData = { value: 'hello world' }
        const expected = unownedComponentProps

        assert.throws(
          () =>
            update.apply(invocation, [unownedComponentId, { data: newData }]),
          notAuthorized
        )
        const updatedComponent = Components.findOne({
          _id: unownedComponentId
        })

        // ensure only data changed
        assert.deepEqual(updatedComponent, expected)
      })

      it('cannot update component type', () => {
        const newType = TEXT
        const expected = componentProps

        assert.throws(
          () => update.apply(invocation, [ownedComponentId, { type: newType }]),
          noModify
        )
        const updatedComponent = Components.findOne({ _id: ownedComponentId })

        // ensure only only data changed
        assert.deepEqual(updatedComponent, expected)
      })
    })
  })
}
