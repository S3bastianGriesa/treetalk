const debug = require('debug')('server:authentication:router');
const router = require('express').Router();
const authenticationService = require('./service');

router.post('/login', function(req, res) {
  authenticationService.login(req.body.email, req.body.password).then(
    function(authentication) {
      if (authentication.isAuthenticated) {
        const user = authentication.user;

        delete user.salt;
        delete user.hashed_password;

        req.session.user = user;

        debug(user);

        res.redirect('/app/index.html');
      } else {
        res.redirect('/login.html')
      }
    }).catch(function(err) {
    res.status(400).send('Something went wrong, please try again later');
  });
});

router.get('/app/logout', function(req, res) {
  if (req.session) {
    req.session.destroy();
  }
  res.redirect('/index.html');
});

module.exports = router;
