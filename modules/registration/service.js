const debug = require('debug')('server:registration:service');
const _ = require('underscore');
const userService = require('user').service;
const CryptoUtil = require('crypto-util');

class RegistrationService {
  registerUser(parameters) {
    return this.validateUserData(parameters)
      .then(() => {
        parameters.salt = CryptoUtil.createRandomSalt(16);
        console.log('pass: ' + parameters.password + ' salt: ' + parameters.salt );
        parameters.hashed_password = CryptoUtil.createPasswordHash(parameters.password, parameters.salt);
        parameters.role = 'user';
        const userdata = _.pick(parameters, 'email', 'username', 'full_name', 'role', 'salt', 'hashed_password');
        return userService.createUser(userdata);
      });
  }

  validateUserData(parameters) {
    return this.validateEmail(parameters.email)
      .then(() => {
        return this.validateUsername(parameters.username)
          .then(() => {
              return this.validatePassword(parameters.password, parameters.password_repeat);
          });
      });
  }

  validateEmail(email) {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email) && email !== '') {
      return userService.getUserByEmail(email)
        .then((user) => {
          if(user) return Promise.reject('Email is already taken.');
          else return Promise.resolve();
        });
    }
    else {
      return Promise.reject('No valid emailadress.');
    }
  }

  validateUsername(username) {
    if(username !== '') {
      return userService.getUserByUsername(username)
        .then((user) => {
          if(user) return Promise.reject('Username is already taken.');
          else return Promise.resolve();
        });
    }
    else {
      return Promise.reject('No username.');
    }
  }

  validatePassword(password, password_repeat) {
    if(password !== '') {
      if(password === password_repeat) {
        return Promise.resolve();
      }
      else {
        return Promise.reject('Passwords are not the same.');
      }
    }
    else {
      return Promise.reject('No Password.');
    }
  }
}

module.exports = new RegistrationService();
