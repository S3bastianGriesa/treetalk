const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    title: {
        type: String
    },
    access: {
        type: String,
        enum: ['public', 'private']
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    moderators: {
        type: [mongoose.Schema.ObjectId],
        ref: 'User'
    },
    members: {
        type: [mongoose.Schema.ObjectId],
        ref: 'User',
        required: true,
        index: true
    }
});

ConversationSchema
    .virtual('isOneToOneConversation')
    .get(() => {
        return this.members.length === 2;
    });

module.exports = mongoose.model('Conversation', ConversationSchema);
