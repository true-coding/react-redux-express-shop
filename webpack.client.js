const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    })
  ]
};

module.exports = merge(baseConfig, config);
