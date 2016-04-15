const debug = require('debug')('server:conversation:service');
const Conversation = require('./model');
const _ = require('underscore');

class ConversationService {
    createConversation(title, access, owner) {
        debug('#createConversation()');

        if (!owner) {
            return Promise.reject(new Error('Owner must not be null'));
        }

        const conversation = new Conversation({
            title: title || 'New Conversation',
            access: access || 'private',
            owners: [owner],
            members: [owner]
        });

        debug('Creating a new Conversation: ' + JSON.stringify(conversation, null, 2));

        return conversation.save();
    }

    updateConversation(parameters) {
      res.status(503).send('Not implemented yet');
    }

    getConversation(id) {
        debug('getConversation: ' + id);

        return Conversation
            .findById(id)
            .exec();
    }

    getUserConversations(userId) {
        debug('getUserConversations called for User ID: ' + userId);

        return Conversation
            .find({
                members: userId
            })
            .exec();
    }

    getAllConversations() {
        debug('getAllConversations');

        return Conversation
            .find({})
            .exec();
    }

    getPublicConversations() {
        debug('getPublicConversations');

        return Conversation
            .find({
                access: 'public'
            })
            .exec();
    }
}

module.exports = new ConversationService();
