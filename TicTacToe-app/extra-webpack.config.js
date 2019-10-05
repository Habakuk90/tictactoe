const webpack = require('webpack');

module.exports = {
  plugins: [
    // new webpack.EnvironmentPlugin(['KEY', 'SQLSERVER']),
    new webpack.DefinePlugin({
      'process.env': {
        GHOST_API_KEY: process.env.GHOST_API_KEY,
      }
    })
  ]
}
