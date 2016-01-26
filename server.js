var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

console.log('version: ' + process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/img/:imgName', function (req, res) {
    res.sendFile(path.join(__dirname, 'public1', 'img', req.params.imgName));
  })

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public1', 'index.html'));
  });

  app.get('/*/create', function (req, res) {
    res.sendFile(path.join(__dirname, 'public1', 'index.html'));
  });

  app.listen(3000, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Listening at http://localhost:3000');
  });
} else {

  app.get('/img/:imgName', function (req, res) {
    res.sendFile(path.join(__dirname, 'public','img', req.params.imgName));
  })
  
  app.get('/bundle.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'bundle.js'));
  })
  
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })

  app.listen(process.env.PORT || 3000, '0.0.0.0', function (err) {
    if (err) { console.log(err) };
    console.log('Listening')
  });
}
