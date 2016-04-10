const mongoose = require('mongoose');
const debug = require('debug')('server:conversation:model');

const Conversation = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  access: {
    type: String,
    enum: ['public', 'private'],
    required: true
  }
});

module.exports = mongoose.model('Conversation', Conversation);
