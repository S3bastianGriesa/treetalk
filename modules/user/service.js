const debug = require('debug')('server:user:service');
const crypto = require('crypto');

const UserModel = require('./model');

class UserService {
  createUser(parameters) {
    debug('create new user ' + parameters);
    const user = new UserModel(parameters);
    return user.save();
  }

  deleteUserByID(id) {
    return UserModel.findByIdAndRemove(id).exec();
  }

  getAllUsersData() {
    return UserModel
            .find({})
            .select('_id username email full_name role')
            .exec();
  }

  getUserDataByID(id) {
    return UserModel
            .find({_id: id})
            .select('_id username email full_name role')
            .exec();
  }

  getUserByID(id) {
    return UserModel.findById(id).exec();
  }

  getUserByUsername(username) {
    return UserModel.findOne({username: username}).exec();
  }

  getUserByEmail(email) {
    return UserModel.findOne({email: email}).exec();
  }

  authenticate(password, user) {
    return this.encryptPassword(password, user) === user.hashed_password;
  }

  makeSalt() {
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

module.exports =  new UserService();
