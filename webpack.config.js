const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './app/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3500,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })),
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './app/index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css')
  ]
};
