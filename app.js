#!/usr/bin/env node
const express = require('express');
const app = express();
const path = require('path');
const debug = require('debug')('hackthon:server');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const port = process.env.PORT || 1024;

require('./server/ioconnect')(server);

global.__isDev__ = app.locals.isDev = app.get('env') === 'development';

// dev build
if (__isDev__) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
      colors: true,
    },
  }));
  app.use(webpackHotMiddleware(compiler));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logger
app.use(morgan('dev'));

// parse application/json
app.use(bodyParser.json());

// static directory
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.render('index'));

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

module.exports = server;
