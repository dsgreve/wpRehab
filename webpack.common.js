const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    bundled: ['./src/js/Bundle.js', './src/css/wr-styles.css'],
    vendor: './src/js/Vendor.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/images/',to:'images'}
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../images'
          }
        }
      }
    ]
  }
};