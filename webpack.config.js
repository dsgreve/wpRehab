var path = require('path');
module.exports = {
    mode: 'none',
    entry: "./src/scripts/App.js",
    output: {
        path: path.resolve(__dirname, "./custom/scripts"),
        filename: "App.js"
    },
    module: {
        rules: [
            {   
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                
                
            }
        ]
    }
}