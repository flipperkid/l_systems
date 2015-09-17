var path = require('path');
module.exports = {
  entry: [
    path.join(__dirname, 'src/app.jsx')
  ],
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
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
		filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'src'),
      loaders: ['react-hot', 'babel-loader']
    }]
  },
  plugins: []
}
