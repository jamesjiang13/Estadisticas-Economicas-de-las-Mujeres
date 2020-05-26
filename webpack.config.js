const path = require('path');
const webpack = require('webpack');

const config = {
  entry: path.join(__dirname, './public/javascripts/index.js'),
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
  ],
  devtool: 'source-map',
};

module.exports = config;
