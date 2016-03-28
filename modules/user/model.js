const mongoose = require('mongoose');
const crypto = require('crypto');

const userService = require('./service');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  full_name: String,
  role: String,
  hashed_password: String,
  salt: String
});

UserSchema
  .virtual('password')
  .set(function setPassword(password) {
    this._password = password;
    this.salt = userService.saltIt();
    this.hashed_password = userService.encryptPassword(password, this);
  })
  .get(function getPassword() {
    return this._password;
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
