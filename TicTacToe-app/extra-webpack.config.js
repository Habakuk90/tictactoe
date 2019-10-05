const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin(['GHOST_API_KEY']),
    new webpack.DefinePlugin({
      'process.env.GHOST_API_KEY': process.env.GHOST_API_KEY,
      'env': process.env.GHOST_API_KEY
    })
  ]
}
