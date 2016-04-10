const express = require('express');
const http = require('http');
const nconf = require('nconf');
const debug = require('debug')('server:app');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const user = require('user');
const registration = require('registration');

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

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(user.router);
app.use(registration.router);

debug('Try to establish mongdb connection on: ' + db_url);
mongoose.connect(db_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', () => {
  debug('mongodb connection successful established.');
  server.listen(webOptions, function listeningCallback() {
    debug('server listen on: ', server.address());
  });
});
