'use strict'

global.config = require('./config');

exports.print = function() {
  console.log("dx-js version 0.0.0\n");
}

exports.createDiscoveryServer = function(port) {
  return require('./lib/net/discovery-server').create(port);
}

exports.createDiscoveryClient = function(port) {
  return require('./lib/net/discovery-client').create(port);
}

