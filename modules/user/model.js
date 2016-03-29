const mongoose = require('mongoose');
const debug = require('debug')('server:user:model');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  full_name: String,
  role: String,
  hashed_password: String,
  salt: String
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
