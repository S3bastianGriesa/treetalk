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
      res.status(200);
      res.redirect('/login.html');
      res.end();
    })
    .catch((err) => {
      debug('an error occured during registration: ' + err);
      res.send(err).end();
    });
});

router.get('/register/email/:email', (req, res) => {
  const email = req.params.email;
  debug('checking email: ' + email);
  registrationService.isEmailTaken(email)
    .then((taken) => {
      res.status(200);
      res.json(taken);
      res.end();
    })
    .catch((err) => {
      debug('an error occured during checking an email: ' + err);
      res.status(400);
      res.send(err);
      res.end();
    });
});

module.exports = router;
