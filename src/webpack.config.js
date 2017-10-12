'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js'),
    pathinfo: true,
  },
  module: {
    rules: [

    ],
  },
  plugins: [

  ],
  devtool: 'source-map',
  watch: true,
};
