const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const parseServer = require('parse-server').ParseServer;
// const parseDashboard = require('parse-dashboard');
const cors = require('cors');
const fetch = require('node-fetch')
const songs = require('../songs.json')

require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// const api = new parseServer({
//     databaseURI: process.env.DATABASE_URI, //'mongodb://localhost:27017/parse',
//     // cloud: __dirname + '/cloud/main.js',
//     appId: process.env.APP_ID,
//     masterKey: process.env.MASTER_KEY,
//     serverURL: 'http://localhost:3001/parse'
//   });

// const dashboard = new parseDashboard({
//     "apps": [
//     {
//         "serverURL": "http://localhost:3001/parse",
//         "appId": process.env.APP_ID,
//         "masterKey": process.env.MASTER_KEY,
//         "appName": "paxebonum"
//     }
//     ],
//     "users": [
//     {
//         "user":process.env.DASHBOARD_LOGIN_USER,
//         "pass":process.env.DASHBOARD_LOGIN_PASSWORD
//     }
//     ],
//     "useEncryptedPasswords": false,
//     }, 
//     { allowInsecureHTTP: true }
// );
  
// Setup CORS
var corsOptions = {
    origin: (origin, callback) => {
      if (true) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/',      indexRouter);
app.use('/users', usersRouter);

app.use('/parse/classes/Song/', (req, res) => {
  if (req.method !== "GET") return res.status(404).json('I dont have that');
  //if (req.path === "/") return res.json({results: songs})
  if (req.path.startsWith('/')) {
    let id = req.path.substr(1)
    if (!id) return res.json({results: songs})
    for (let song of songs) {
      if (song.objectId == id) {
        return res.json(song)       
      }
    }
  }
  res.status(404).json('I dont have that');
});
// app.use('/parse', api);
// app.use('/db',    dashboard);

app.get('/aelf/:type/:date/:zone', async (req, res) => {
    let fetchResult = await fetch(`https://api.aelf.org/v1/${req.params.type}/${req.params.date}/${req.params.zone}`);
    let json = await fetchResult.json();
    res.json(json);
  });
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
module.exports = app;
