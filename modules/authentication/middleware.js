const debug = require('debug')('server:authentication:middleware');
const userService = require('user').service;

class AuthenticationMiddleware {
  requiresLogin(req, res, next) {
    debug('RequireLogin: Check if Session is valid');
    if (req.session && req.session.user) {
      userService.getUserDataByID(req.session.user.id).then(function(user) {
        if (user) {
          req.session.user = user;
          next();
        } else {
          res.redirect('/login');
        }
      }).fatch(function(err) {
        console.error(err);
        res.status(400).send(err);
      })
    } else {
      res.redirect('/login');
    }
  }
}

module.exports = new AuthenticationMiddleware();
