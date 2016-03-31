const debug = require('debug')('server:user:service');

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

  updateUserByID(id, parameters) {
    return UserModel.update({_id: id}, parameters).exec();
  }
}

module.exports =  new UserService();
