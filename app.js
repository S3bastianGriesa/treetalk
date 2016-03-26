const express = require('express');
const http = require('http');
const nconf = require('nconf');
const debug = require('debug')('server:app');


nconf
  .argv()
  .env()
  .file({
    file: './config.json'
  });

const webOptions = {
  port: nconf.get('WEB_PORT'),
  host: nconf.get('WEB_HOST')
};

const app = express();
const server = http.createServer(app);

server.listen(webOptions, function listeningCallback() {
  debug('server listen on: ', server.address());
});
