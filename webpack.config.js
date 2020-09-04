const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.export = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './app/index.js',

    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname, 'dist')
      },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: [
                /node_modules/
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            inject: 'body'
        })
    ],
    devServer: {
        // contentBase: './public',
        port: 7700,
    }
}