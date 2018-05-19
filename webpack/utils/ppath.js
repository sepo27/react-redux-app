const npath = require('path');

const ROOT = `${__dirname}/../../`;

module.exports = {
  to(path = '') { return npath.normalize(`${ROOT}${path}`); },
  toSrc(path = '') { return npath.resolve(this.to('src'), path); },
  toDist(path = '') { return npath.resolve(this.to('dist'), path); },
};
