require('dotenv').config()

const fs = require('fs')
const path = require('path');
const express = require('express');

// express middlewares
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const debug = require('debug')('backend:server');
const fetch = require('node-fetch')
const http = require('http');

const dataSongPath = __dirname + '/data/songs.json'

if (!fs.existsSync(dataSongPath)) {
  require('./data/import-songs')()
}
const songs = require(dataSongPath)

const app = express();

// Setup CORS
app.use(cors({
  origin: (origin, callback) => {
    if (true) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// API
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


// API AELF
app.get('/aelf/:type/:date/:zone', async (req, res) => {
  let fetchResult = await fetch(`https://api.aelf.org/v1/${req.params.type}/${req.params.date}/${req.params.zone}`);
  let json = await fetchResult.json();
  res.json(json);
});


// Everything else gets passed to frontend
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
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

//module.exports = app;


// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);

server.on('error', (error) => {

  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}