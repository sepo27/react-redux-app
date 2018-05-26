const webpack = require('webpack'); // eslint-disable-line no-unused-vars
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
