const debug = require('debug')('server:user:service');
const UserModel = require('./model');

class UserService {
  createUser(parameters) {
    const user = new UserModel(parameters);
    return user.save();
  }
}

module.exports = UserService;
