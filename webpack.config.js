const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ui-library.js',
    library: 'uiLibrary',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [
    {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: '_'
    },
    {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: '_'
    },
    {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      root: '_'
    }
  ]
}
