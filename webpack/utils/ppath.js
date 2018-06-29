const path = require('path');

const ROOT = `${__dirname}/../../`;

module.exports = {
  to(...segments) { return path.resolve(path.normalize(ROOT), ...segments); },
  toSrc(segment = '') { return this.to('src', segment); },
  toDist(segment = '') { return this.to('dist', segment); },
  toTest(segment = '') { return this.to('test', segment); },
  toModules(segment = '') { return this.to('node_modules', segment); },
};
