'use strict'

const del = require('del');
const gulp = require('gulp');
const webserver  = require('gulp-webserver');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config');
const env = process.env.NODE_ENV || 'development';

// remove files
gulp.task('clean', () => {
  del(['./dist/*.js']);
  del(['./dist/*.map']);
});

// Compile TypeScript and run webpack
gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest("./dist"));
});

// launch dev server
gulp.task('serve', () => {
  gulp.src('./dist')
    .pipe(webserver({
      host: '127.0.0.1',
      port: 8888,
      livereload: true,
      open: true
    }));
});

// watch ts
gulp.task('watch', () => {
  gulp.watch('./src/**/*.ts', ['webpack']);
});

gulp.task('default', (callback) => {
  if (env === 'production') {
    runSequence('clean', 'webpack', callback);
  } else {
    runSequence('clean', 'webpack', 'watch', 'serve', callback);
  }
});

