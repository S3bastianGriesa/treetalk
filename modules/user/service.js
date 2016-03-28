const debug = require('debug')('server:user:service');
const UserModel = require('./model');

class UserService {
  createUser(parameters) {
    debug('create new user ' + parameters);
    const user = new UserModel(parameters);
    return user.save();
  }
}

module.exports = new UserService();
