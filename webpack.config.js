const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  module: {
    rules: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env'],
	          plugins: [
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-react-jsx')
            ]
	        }
	      }
	    }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
    },
    modules: [
      path.resolve( __dirname, 'src'),
      'node_modules'
    ]
  }
};

module.exports = config;
