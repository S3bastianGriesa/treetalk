const mongoose = require('mongoose');

const Conversation = new mongoose.Schema({
  title: {
    type: String
  },
  access: {
    type: String,
    enum: ['public', 'private']
  },
  owners: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    required: true
  },
  members: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    required: true,
    index: true
  }
});

module.exports = mongoose.model('Conversation', Conversation);
