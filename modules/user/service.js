const debug = require('debug')('server:user:service');
const UserModel = require('./model');

class UserService {
  createUser(parameters) {
    debug('create new user ' + parameters);
    const user = new UserModel(parameters);
    return user.save();
  }

  deleteUserForID(id) {
    return UserModel.findByIdAndRemove(id).exec();
  }

  getAllUsers() {
    return UserModel
            .find({})
            .select('_id username email full_name role')
            .exec();
  }

  getUserForID(id) {
    return UserModel.findById(id).exec();
  }

  getUserForUsername(username) {
    return UserModel.findOne({username: username}).exec();
  }

  getUserForEmail(email) {
    return UserModel.findOne({email: email}).exec();
  }

  authenticate(password, user) {
    return this.encryptPassword(password) === user.hashed_password;
  }

  saltIt() {
    return crypto.randomBytes(16).toString('base64');
  }

  encryptPassword(password, user){
    if(!password || !user.salt) {
      return '';
    }

    const salt = new Buffer(user.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
}

module.exports = new UserService();
