var path = require('path');
module.exports = {
    entry: "./src/scripts/App.js",
    output: {
        path: path.resolve(__dirname, "./custom/scripts"),
        filename: "App.js"
    }
}