var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require('./webpack.config.js')

gulp.task('webserver', function() {
  connect.server({
    port: 8080,
    host: 'celerity.dev',
    livereload: true
  });
});

gulp.task("build-dev", ["webpack"], function() {
  gulp.watch(["src/*.jsx"], ["webpack"]);
});

var devConfig = Object.create(webpackConfig);
devConfig.devtool = "sourcemap";
devConfig.debug = true;
var devCompiler = webpack(devConfig);
gulp.task('webpack', function() {
  devCompiler.run(function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log("[webpack]", stats.toString({
			colors: true
		}));
  });
});

gulp.task('default', ['build-dev', 'webserver']);
