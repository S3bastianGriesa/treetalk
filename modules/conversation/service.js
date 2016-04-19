const debug = require('debug')('server:conversation:service');
const mongoose = require('mongoose');
const Conversation = require('./model');
const _ = require('underscore');

class ConversationService {
    createConversation(title, access, owner) {
        const conversation = new Conversation({
            title: title || 'New Conversation',
            access: access || 'private',
            owner: owner,
            moderators: [],
            members: [owner]
        });

        debug('Create new Conversation: ' + JSON.stringify(conversation, null, 2));

        return conversation.save();
    }

    updateConversation(id, properties) {
        debug('Update Conversation: ' + id);
        debug('Update Conversation Properties: ' + JSON.stringify(properties, null, 2));

        return Conversation
            .findByIdAndUpdate(id, properties)
            .exec();
    }

    getConversation(id) {
        debug('Get Conversation by ID: ' + id);

        return Conversation
            .findById(id)
            .exec();
    }

    getUserConversations(userId) {
        debug('Get Conversation by User ID: ' + userId);

        return Conversation
            .find({
                members: new mongoose.Types.ObjectId(userId)
            })
            .exec();
    }

    getAllConversations() {
        debug('Get all Conversations');

        return Conversation
            .find({})
            .exec();
    }

    getPublicConversations() {
        debug('Get public Conversations');

        return Conversation
            .find({
                access: 'public'
            })
            .exec();
    }

    removeConversation(id) {
        debug('Remove conversation by ID: ' + id);

        return Conversation
            .findByIdAndRemove(id)
            .exec();
    }
}

module.exports = new ConversationService();
