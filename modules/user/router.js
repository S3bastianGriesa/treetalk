const express = require('express');
const debug = require('debug')('server:user:router');
const _ = require('underscore');

const userService = require('./service');
const router = express.Router();

router.post('/user', (req, res) => {
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

router.get('/user', (req, res) => {
  debug('receiving all userdata');
  userService
    .getAllUsers()
    .then((userdata) => {
      debug('receiving userdata successful!');
      res.json(userdata);
    })
    .catch((err) => {
      debug('an error occurred on receiving userdata. ${err}', err);
      res.status(400).send(err);
    });
});

router.delete('/user', (req, res) => {
  const id = _.pick(req.body, 'id').id;
  debug('deleting user ' + id);
  if(!_.isUndefined(id)){
    userService
    .deleteUserForID(id)
    .then(() => {
      debug('deleting user successful!');
      res.status(200).end();
    })
    .catch((err) => {
      debug('an error occurred on receiving userdata. ${err}', err);
      res.status(400).send(err);
    });
  }
});

module.exports = router;
