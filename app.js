const express = require('express');
const http = require('http');
const nconf = require('nconf');
const debug = require('debug')('server:app');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

const userRouter = require('./modules/user').router;
const userService = require('./modules/user').service;

nconf
  .argv()
  .env()
  .file({
    file: './config.json'
  });

const db_url = nconf.get('DB_URL');
const webOptions = {
  port: nconf.get('WEB_PORT'),
  host: nconf.get('WEB_HOST')
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(userRouter);

debug('Try to establish mongdb connection on: ' + db_url);
mongoose.connect(db_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', () => {
  debug('mongodb connection successful established.');
  server.listen(webOptions, function listeningCallback() {
    debug('server listen on: ', server.address());
  });
  userService
  .createUser({
    username: 'S3bb',
    email: 'sebastian.griesa@gmail.com',
    full_name: 'Sebastian Griesa',
    role: 'admin',
    password: 'hallo123'
  })
  .then((user) => {
    debug('successful created user!');
  })
  .catch((err) => {
    debug('an error occurred on creating a user. #{err}.', err);
  });
});
