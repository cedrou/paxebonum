var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var parseServer = require('parse-server').ParseServer;
var parseDashboard = require('parse-dashboard');

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var api = new parseServer({
  databaseURI: 'mongodb://localhost:27017/parse',
  cloud: __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  push: {}, // See the Push wiki page
  serverURL: 'http://localhost:3001/parse'
});

var dashboard = new parseDashboard({
  "apps": [
  {
    "serverURL": "http://localhost:3001/parse",
    "appId": process.env.APP_ID,
    "masterKey": process.env.MASTER_KEY,
    "appName": "paxebonum"
  }
  ],
  "users": [
  {
    "user":process.env.DASHBOARD_LOGIN_USER,
    "pass":process.env.DASHBOARD_LOGIN_PASSWORD
  }
  ],
  "useEncryptedPasswords": false,
}, 
{ allowInsecureHTTP: true }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parse', api);
app.use('/db', dashboard);

module.exports = app;
