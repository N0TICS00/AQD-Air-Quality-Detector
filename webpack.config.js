const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const DotenvWebpackPlugin = require("dotenv-webpack")

module.exports= {
    mode:"development",
    entry: "./assets/js/index.js",
    devtool: "inline-source-map",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename:"bundle.js"
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({}),
        new DotenvWebpackPlugin()
    ]
}