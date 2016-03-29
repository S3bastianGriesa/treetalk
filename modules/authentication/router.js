const debug = require('debug')('server:authentication:router');
const router = require('express').Router();
const authenticationService = require('./service');

router.post('/login', function(req, res) {
  debug('Login request has been send');
  authenticationService.login(req.body.email, req.body.password).then(
    function(authentication) {
      if (authentication.isAuthenticated) {
        const user = authentication.user;

        delete user.salt;
        delete user.hashed_password;

        req.session.user = user;

        res.redirect('/app/index.html');
      }
    }).catch(function(err) {
    debug(err);
    res.status(400).send('Something went wrong, please try again later');
  });
});

router.get('/app/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/index.html');
});

module.exports = router;
