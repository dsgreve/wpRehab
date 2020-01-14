const path = require("path");

module.exports = {

  entry: {
    bundled: "./src/js/Bundle.js",
    vendor: "./src/js/Vendor.js"
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images"
          }
        }
      }
    ]
  }
};