const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../n/dist'),
    publicPath: '/n/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      '@': resolve("src")
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        // loaders: [
        //   'url-loader?limit=300&name=[name]-[hash].[ext]',
        //   'image-webpack-loader'
        // ]
        loader: 'url-loader',
        options: {
          limit: 100,
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
      }),
      // new webpack.optimize.UglifyJsPlugin({
        // compress: { warnings: false }
      // }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      })
    ]
    : [
      new FriendlyErrorsPlugin()
    ]
}
