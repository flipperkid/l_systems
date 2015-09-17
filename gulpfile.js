var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js')

gulp.task('webserver', function() {
  connect.server({
    port: 8080,
    host: 'celerity.dev',
    livereload: true
  });
});

gulp.task('build-dev', ['webpack'], function() {
  gulp.watch(['src/*.jsx'], ['webpack']);
});

var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;
var devCompiler = webpack(devConfig);
gulp.task('webpack:build-dev', function() {
  devCompiler.run(function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
  });
});

gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  var buildConfig = Object.create(webpackConfig);
  buildConfig.plugins = buildConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(buildConfig, function(err, stats) {
    if(err) {
      throw new gutil.PluginError("webpack:build", err);
    }

    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function(callback) {
  // modify some webpack config options
  var devServerConfig = Object.create(webpackConfig);
  devServerConfig.devtool = 'eval';
  devServerConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(devServerConfig), {
    publicPath: '/' + devServerConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(8080, '0.0.0.0', function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    
    gutil.log('[webpack-dev-server]', 'http://celerity-dev:8080/webpack-dev-server/index.html');
  });
});

//gulp.task('default', ['build-dev', 'webserver']);
gulp.task('default', ['webpack-dev-server']);
gulp.task("build", ["webpack:build"]);
