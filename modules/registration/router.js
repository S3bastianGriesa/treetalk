const express = require('express');
const debug = require('debug')('server:registration:router');
const registrationService = require('./service');
const _ = require('underscore');
const router = express.Router();

router.post('/register', (req, res) => {
  const parameters = _.pick(req.body, 'username', 'email', 'full_name', 'password', 'password_repeat');
  debug('registering user: ' + parameters.username);
  registrationService.registerUser(parameters)
    .then((user) => {
      res.end(200);
    })
    .catch((err) => {
      debug('Error occured during registration: ' + err);
      res.send(err).end();
    });
});

module.exports = router;
