const debug = require('debug')('server:user:service');
const UserModel = require('./model');

class UserService {
  createUser(parameters) {
    debug('create new user ' + parameters);
    const user = new UserModel(parameters);
    return user.save();
  }

  getAllUsers() {
    return UserModel
            .find({})
            .select('_id username email full_name role')
            .exec();
  }
}

module.exports = new UserService();
