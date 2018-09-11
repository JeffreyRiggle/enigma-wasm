const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/client/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }
    ]
  },
  plugins: [
      HtmlWebpackPluginConfig,
      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: false,
        allChunks: true
      })
  ],
  devServer: {
      port: 3000
  }
};

module.exports = config;