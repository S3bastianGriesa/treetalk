const mongoose = require('mongoose');
const crypto = require('crypto');

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
    this.salt = this.saltIt();
    this.hashed_password = this.encryptPassword(password);
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

UserSchema.methods = {
  authenticate: function authenticate(password) {
    return this.encryptPassword(password) === this.hashed_password;
  },

  saltIt: function saltIt() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function encryptPassword(password){
    if(!password || !this.salt) {
      return '';
    }

    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
