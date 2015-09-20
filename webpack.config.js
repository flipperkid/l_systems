var path = require('path');
module.exports = {
  entry: [
    '/vagrant/src/app.jsx'
  ],
  cache: true,
  resolve: {
    root: '/home/vagrant/dev/node_modules'
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
      include: '/vagrant/src',
      loaders: ['react-hot', 'babel-loader']
    }]
  },
  plugins: []
}
