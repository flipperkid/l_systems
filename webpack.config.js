var path = require('path');
module.exports = {
  entry: __dirname,
  cache: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'src/'),
      loaders: ['react-hot-loader', 'babel-loader']
    }]
  },
  plugins: []
}
