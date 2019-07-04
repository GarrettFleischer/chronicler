import { Meteor } from 'meteor/meteor';
import { Nodes } from '../nodes/nodes';
import { Components, INSERT, REMOVE, UPDATE } from './components';


Components.helpers({
    node() {
        return Nodes.findOne({ _id: this.nodeId });
    },
});


Meteor.methods({
    [INSERT](type, nodeId, order, data) {
        if (!this.userId) throw new Meteor.Error('not-authorized');
        return Components.insert({
            owner: this.userId,
            createdOn: Date.now(),
            type,
            nodeId,
            order,
            data,
        });
    },

    [UPDATE](id, { data, order }) {
        const component = Components.findOne({ _id: id });
        if (this.userId !== component.owner) throw new Meteor.Error('not-authorized');
        const updatedData = { ...(component ? component.data : {}), ...data };
        return Components.update({ _id: id }, { $set: { data: updatedData, order } });
    },

    [REMOVE](id) {
        const component = Components.findOne({ _id: id });
        if (this.userId !== component.owner) throw new Meteor.Error('not-authorized');
        return Components.remove({ _id: id });
    },
});