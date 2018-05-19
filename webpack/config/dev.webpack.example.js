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
          priority: -10
        },
      },
    },
  },
  
  devServer: {
    contentBase: ppath.toDist(),
    compress: true,
    port: 3000,
  },
});
