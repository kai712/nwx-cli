const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinaWebpackPlugin = require('wx-entry-webpack-plugin')
const MinaRuntimePlugin = require('wx-runtime-webpack-plugin')

const webpack = require('webpack');
const debuggable = process.env.BUILD_TYPE !== 'release'

// 可自行选择是否开启happypack
// const happypack = require('happypack')

module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      name: 'common',
      minChunks: 2,
      minSize: 0,
    }
  },
  context: resolve('src'),
  entry: './app.js',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    globalObject: 'wx'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.(scss)$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[path][name].wxss',
              context: resolve('src'),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [resolve('src', 'styles'), resolve('src')]
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MinaWebpackPlugin({
      scriptExtensions: ['.js'],
      assetExtensions: ['.scss'],
    }),
    new MinaRuntimePlugin(),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: ['**/*.js', '**/*.scss', '**/*.wxss'],
      },
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development',
      BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || 'debug',
    })
  ],
  mode: debuggable ? 'none' : 'production'
}