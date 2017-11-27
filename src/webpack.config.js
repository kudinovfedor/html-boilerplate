'use strict';
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js'),
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        /*use: {
          loader: 'jshint-loader',
        },*/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'modules': false,
              }]
            ],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded', // expanded, nested, compact, compressed
              precision: 5,
              sourceComments: false,
              includePaths: [],
            }
          }],
        }),
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: false,
      sourceMap: false,
      uglifyOptions: {
        output: {
          comments: false,
        },
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('./../css/bundle.css');
      },
      allChunks: true,
      disable: false,
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./!*.html', './css/!*.css', './js/!**!/!*.js', './!*.php'],
      server: {baseDir: ['src']},
      //proxy: 'http://sites.local/fk-template/src/',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.CommonsChunkPlugin('vendors'),
  ],
  devtool: 'false', // 'source-map'
  devServer: {
    contentBase: path.resolve(__dirname),
    hot: true,
  },
  watch: true,
};
