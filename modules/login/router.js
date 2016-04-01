const router = require('express').Router();
const authenticationService = require('authentication').service;

router.get('/login', (req, res) => {
  res.sendFile('/login.html', {
    root: './public'
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //TODO: Validate input params.
  authenticationService.login(email, password).then(function(authentication) {
    if (authentication.isAuthenticated) {
      req.session.user = authentication.user;
      res.redirect('/app/chat');
    } else {
      res.redirect('/login');
    }
  }).catch(function(err) {
    console.error(err);
    res.status(400).send(err);
  });
});

module.exports = router;
