var path = require("path");
module.exports = {
  entry: __dirname,
  cache: true,
  resolveLoader: {
    root: [
      '/usr/lib/node_modules'
    ]
  },
  resolve: {
    root: [
      '/usr/lib/node_modules'
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
}
