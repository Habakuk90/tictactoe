const webpack = require('webpack');
require('dotenv').config()

module.exports = {
  plugins: [
    // new webpack.EnvironmentPlugin(['GHOST_API_KEY']),
    new webpack.DefinePlugin({
      'process.env': {
        GHOST_API_KEY: JSON.stringify(process.env.GHOST_API_KEY),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    })
  ]
}
