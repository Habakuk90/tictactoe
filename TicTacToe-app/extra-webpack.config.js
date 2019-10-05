const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        KEY: JSON.stringify(process.env.KEY),
        KEY2: JSON.stringify(process.env.KEY2)
      }
    })
  ]
}
