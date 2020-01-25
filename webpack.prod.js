const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCss = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin") //minifies js default so it is included already
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].js", //use [name] to give file name of main or vendor
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCss(),
      new TerserPlugin()
    ]
  },
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: 'css/wr-styles.css'
    }),
    new CleanWebpackPlugin()
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