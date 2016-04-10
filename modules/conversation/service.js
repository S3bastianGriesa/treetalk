const Conversation = require('./model');

class ConversationService {
  createConversation(title, owner, access = 'public') {
    const conversation = new Conversation({
      title: title,
      owner: owner,
      access: access,
      users: [owner]
    });

    debug('createNewConversation: ' + JSON.stringify(conversation, null, 2));

    return conversation.save();
  }

  getConversationById(id) {
    debug('getConversationById: ' + id);

    return Conversation.findById(id).exec();
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

  getUserConversations(user) {
    throw new Error('getAllUserConversations is not yet implemented');
  }
}

module.exports = new ConversationService();
