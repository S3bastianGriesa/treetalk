const debug = require('debug')('server:authentication:service')
const userService = require('user').service;
const crypoUtil = require('crypto-util');

class AuthenticationService {
  login(email, password) {
    debug('Login function called');
    return userService.getUserByEmail(email).then(function(user) {
      let isAuthenticated = false;

      if (user) {
        const salt = user.salt;
        const hashedPassword = cryptoUtil.createPasswordHash(password,
          salt, 10000);

        isAuthenticated = user.hashed_password == hashedPassword;
      }

      return {
        isAuthenticated: isAuthenticated,
        user: user;
      };
    });
  }
}

module.exports = new AuthenticationService();
