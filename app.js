const express = require('express');
const http = require('http');
const nconf = require('nconf');
const debug = require('debug')('server:app');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSessionStore = require('connect-mongo')(session);
const uid = require('uid-safe');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const authentication = require('authentication');
const login = require('login');
const user = require('user');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'SuperSecretKeyLulz',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 60 * 1000
  },
  store: new MongoDBSessionStore({
    mongooseConnection: db
  })
}));

app.use(user.router);
app.use(login.router);
app.get('/app/chat', authentication.middleware.requiresLogin, (req, res) => {
  res.sendFile('chat.html', {
    root: './public'
  });
});
