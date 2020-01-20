const path = require('path');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/wr-styles.css'
    }),
    new BrowserSyncPlugin({
      files: '**/*.php',
      injectChanges: true,
      proxy: 'http://localhost:81/wordpressrehab'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Inject styles into DOM
          'css-loader?url=false', //2. Turns css into commonjs
          {loader: 'postcss-loader', options: { plugins: postCSSPlugins}} //1. Turns postcss into css
        ]
      }
    ]
  }
});