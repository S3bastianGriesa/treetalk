const userService = require('user').service;
const crypoUtil = require('crypto-util');

class AuthenticationService {
  login(email, password) {
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

  logout() {

  }
}

module.exports = new AuthenticationService();
