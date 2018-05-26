const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const deepExtend = require('../utils/deepExtend');
const ppath = require('../utils/ppath');
const commonConfig = require('./common.webpack');

module.exports = deepExtend(commonConfig, {
  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: -10,
        },
      },
    },
  },

  output: {
    publicPath: '/bundle/',
    filename: '[name].js',
    pathinfo: true, // dump path info with each webpack require in bundle
  },

  plugins: [
    ...commonConfig.plugins,
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true, // for wbpack-dev-server to generate index.html on the fly
      title: 'React Redux App',
      filename: ppath.toDist('index.html'),
      template: ppath.toSrc('index.template.html'),
    }),
    new HtmlWebpackHarddiskPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: ppath.toDist(),
    compress: true,
    // hotOnly: true,
    port: 3000,
    stats: 'minimal',
  },
});
