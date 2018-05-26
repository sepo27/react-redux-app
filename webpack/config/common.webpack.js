const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ppath = require('../utils/ppath');

module.exports = {
  entry: {
    main: ppath.toSrc(),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          ppath.toSrc(),
        ],
        use: {
          loader: 'babel-loader',
          // options will be taken from .babelrc
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  output: {
    path: ppath.toDist('bundle'),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  stats: {
    children: false,
    version: false,
    maxModules: 0, // hide modules (https://github.com/webpack/webpack/issues/4141)
  },
};
