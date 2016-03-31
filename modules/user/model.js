const mongoose = require('mongoose');
const debug = require('debug')('server:user:model');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {unique: true},
    required: true
  },
  email: {
    type: String,
    index: {unique: true},
    required: true
  },
  full_name: String,
  role: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

UserSchema
  .virtual('user_data')
  .get(function getUserData() {
    return {
      '_id': this.id,
      'username': this.username,
      'email': this.email,
      'full_name': this.full_name,
      'role': this.role
    };
  });

module.exports = mongoose.model('User', UserSchema);
