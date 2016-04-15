const debug = require('debug')('server:authentication:middleware');
const userService = require('user').service;

class AuthenticationMiddleware {

    requiresLogin(req, res, next) {
        debug('RequiresLogin called');
        debug('RequiresLogin Session Object: ' + JSON.stringify(req.session, null, 2));
        debug('RequiresLogin Session User Object: ' + JSON.stringify(req.session.user, null, 2));

        if (req.session && req.session.user && req.session.user._id) {
            userService.getUserDataByID(req.session.user._id)
                .then((user) => {
                  debug('RequiresLogin query result: ' + JSON.stringify(user, null, 2));
                    if (user) {
                        req.session.user = user;
                        next();
                    } else {
                        res.redirect('/login');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(400).send(err);
                });
        } else {
            res.redirect('/login');
        }
    }

}

module.exports = new AuthenticationMiddleware();
