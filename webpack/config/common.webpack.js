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
    ],
  },

  output: {
    path: ppath.toDist('bundle'),
  },

  plugins: [],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
