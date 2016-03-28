const express = require('express');
const debug = require('debug')('server:user:router');
const _ = require('underscore');

const userService = require('./service');
const router = express.Router();

router.post('/user/create', (req, res) => {
  const parameters = _.pick(req.body, 'username', 'email', 'full_name', 'role', 'password');
  debug('try to create user: ' + parameters);
  userService
    .createUser(parameters)
    .then((user) => {
      debug('created user successful!');
      res.send(user);
    })
    .catch((err) => {
      debug('an error occurred on creating a user. ${err}', err);
      res.status(400).send(err);
    });
});
