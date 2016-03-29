const express = require('express');
const http = require('http');
const nconf = require('nconf');
const debug = require('debug')('server:app');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSessionStore = require('connect-mongodb-session')(session);
const uid = require('uid-safe');

const app = express();
const server = http.createServer(app);

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

const mongoSessionStore = new MongoDBSessionStore({
  uri: db_url,
  collection: 'sessions'
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  genid: function(req) {
    return uid.sync(18);
  },
  secret: 'UltraSuperSecretKeyForLulz',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 60 * 1000,
    secure: true
  },
  store: mongoSessionStore
}));

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
