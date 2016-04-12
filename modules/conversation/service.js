const debug = require('debug')('server:conversation:service');
const Conversation = require('./model');

class ConversationService {
  createConversation(title, access, owner) {
    debug('createConversation');

    const conversation = new Conversation({
      title: title,
      owners: [owner],
      access: access,
      members: [owner]
    });

    debug(JSON.stringify(conversation, null, 2));

    return conversation.save();
  }

  createOneToOneConversation(memberOne, memberTwo) {
    throw new Error('Not yet implemented createOneToOneConversation');
  }

  getConversation(id) {
    debug('getConversation: ' + id);

    return Conversation.findById(id).exec();
  }

  getUserConversations(user) {
    throw new Error('Not yet implemented getUserConversations');
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
