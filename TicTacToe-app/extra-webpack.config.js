const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GHOST_API_KEY': process.env.GHOST_API_KEY
    })
  ]
}
