const extend = require('extend');

module.exports = (src, target) => extend(true /* deep */, {}, src, target);
