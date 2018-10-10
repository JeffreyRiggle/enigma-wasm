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
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        },
        {
            test:/\.rs?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        compact: true
                    }
                },
                {
                    loader: 'rust-native-wasm-loader',
                    options: {
                        release: false,
                        wasmBindgen: {
                            wasm2es6js: true
                        }
                    }
                }
            ]
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