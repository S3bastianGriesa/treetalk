const debug = require('debug')('server:conversation:service');
const mongoose = require('mongoose');
const Conversation = require('./model');
const _ = require('underscore');

class ConversationService {
    createConversation(title, access, owner) {
        debug('CreateConversation called');

        if (!owner) {
            return Promise.reject(new Error('Owner must not be null'));
        }

        const conversation = new Conversation({
            title: title || 'New Conversation',
            access: access || 'private',
            owners: [owner],
            members: [owner]
        });

        debug('new Conversation: ' + JSON.stringify(conversation, null, 2));

        return conversation.save();
    }

    updateConversation(id, title, access, ownerList, memberList) {
        debug('UpdateConersation called for Conversation ID: ' + id);

        const updatedProperties = {
            title: title,
            access: access,
            owners: ownerList,
            members: memberList
        };

        debug('Updated Properties: ' + JSON.stringify(updatedProperties, null, 2));

        return Conversation
            .findByIdAndUpdate(id, updatedProperties)
            .exec();
    }

    getConversation(id) {
        debug('GetConversation called for Conversation ID: ' + id);

        return Conversation
            .findById(id)
            .exec();
    }

    getUserConversations(userId) {
        debug('GetUserConversations called for User ID: ' + userId);

        return Conversation
            .find({
                members: new mongoose.Types.ObjectId(userId)
            })
            .exec();
    }

    getAllConversations() {
        debug('GetAllConversations called');

        return Conversation
            .find({})
            .exec();
    }

    getPublicConversations() {
        debug('GetPublicConversations called');

        return Conversation
            .find({
                access: 'public'
            })
            .exec();
    }

    removeConversation(id) {
        debug('RemoveConversation called for Conversation ID: ' + id);

        return Conversation
            .findByIdAndRemove(id)
            .exec();
    }
}

module.exports = new ConversationService();
