const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  
  entry: {
    main: "./src/js/Bundle.js",
    vendor: "./src/js/Vendor.js"
  },
  plugins: [
    
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};
