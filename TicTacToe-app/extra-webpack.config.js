const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        GHOST_API_KEY: JSON.stringify(process.env.GHOST_API_KEY)
      }
    })
  ]
}
