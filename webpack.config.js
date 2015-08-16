var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.TARGET;

var common = {
  entry: {
    app: path.resolve(__dirname, 'src/app.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'jsx', 'babel'], exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx', 'babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  }
};

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json' }
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if (TARGET === 'dev') {
  module.exports = merge(common, {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client',
      'webpack/hot/dev-server'
    ],
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', 'jsx', 'babel?stage=0'], exclude: /node_modules/ },
        { test: /\.jsx$/, loaders: ['react-hot', 'jsx', 'babel?stage=0'], exclude: /node_modules/ }
      ]
    }
  });
}
