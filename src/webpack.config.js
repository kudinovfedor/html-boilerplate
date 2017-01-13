'use strict';
module.exports = {
  entry: './src/js/app.js',
  output: {
    path: './src/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules|bower_components/
  }
};
