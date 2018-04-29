'use strict'

const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = process.env.NODE_ENV || 'development';

let config = {
  mode: env,

  entry: {
    app :'./src/index.ts'
  },
  output: {
    filename: (env === 'production' ? 'bundle.js' : 'bundle-development.js'),
    libraryTarget: 'umd' // TODO: Ask some of them that this package is callable in browser
  },
  resolve: {
    extensions: ['*', '.ts', '.webpack.js', '.web.js', '.js']
  },

  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader'
    }, {
      test: /\.worker\.js$/,
      use: {loader: 'worker-loader'}
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        ENDPOINT: JSON.stringify(process.env.ENDPOINT || 'https://127.0.0.1:3000')
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

if (env === 'production') {
  // compress js
  config.plugins.push(new UglifyJsPlugin({
    parallel: true,
    uglifyOptions: {
      compress: {
        warnings: false
      }
    }
  }));
} else {
  // for debug
  config.devtool = 'source-map';
}

module.exports = config;
