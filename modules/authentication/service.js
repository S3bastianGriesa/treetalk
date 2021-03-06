const debug = require('debug')('server:authentication:service');
const userService = require('user').service;
const cryptoUtil = require('crypto-util');

class AuthenticationService {
    login(email, password) {
        return userService.getUserByEmail(email)
            .then((user) => {
                let isAuthenticated = false;

                if (user) {
                    const salt = user.salt;
                    const hashedPassword = cryptoUtil.createPasswordHash(password,
                        salt);

                    isAuthenticated = user.hashed_password == hashedPassword;

                    user.salt = '';
                    user.hashed_password = '';
                }

                return {
                    isAuthenticated: isAuthenticated,
                    user: user
                };
            });
    }
}

module.exports = new AuthenticationService();
