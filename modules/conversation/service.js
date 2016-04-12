const debug = require('debug')('server:conversation:service');
const Conversation = require('./model');
const _ = require('underscore');

class ConversationService {
  createOneToOneConversation(memberList) {
    debug('createOneToOneConversation: ' + JSON.stringify(memberList));

    return this.createConversation(memberList[0] + ' - ' + memberList[1],
      'private', memberList);
  }

  createConversation(title, access, ownerList, memberList) {
    debug('createConversation');

    const parameters = {
      title: title || 'New Conversation',
      access: access || 'private',
      ownerList: [] || ownerList,
      memberList: [] || memberList
    };

    const mergedMemberList = _.union(parameters.ownerList, parameters.memberList);

    const conversation = new Conversation({
      title: parameters.title,
      owners: parameters.ownerList,
      access: parameters.access,
      members: mergedMemberList
    });

    debug(JSON.stringify(conversation, null, 2));

    return conversation.save();
  }

  addMemberToConversation(conversationId, userId) {
    return Conversation.findByIdAndUpdate(conversationId, {
      $push: {
        members: userId
      }
    }, {
      safe: true,
      upsert: true
    });
  }

  removeMemberFromConversation(userId) {
    throw new Error('Not yet implemented removeMemberFromConversation');
  }

  getConversation(id) {
    debug('getConversation: ' + id);

    return Conversation.findById(id).exec();
  }

  getUserConversations(userId) {
    debug('getUserConversations');

    return Conversation.find({
      members: userId
    }).exec();
  }

  getAllConversations() {
    debug('getAllConversations');

    return Conversation.find({}).exec();
  }

  getPublicConversations() {
    debug('getPublicConversations');

    return Conversation.find({
      access: 'public'
    }).exec();
  }
}

module.exports = new ConversationService();
