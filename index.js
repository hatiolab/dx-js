'use strict'

global.config = require('./config');

var dx_package = require('./package');

exports.printInfo = function() {
  console.log("dx-js version : " + dx_package.version);
}

exports.createDiscoveryServer = function(port) {
  return require('./lib/net/discovery-server').create(port);
}

exports.createDiscoveryClient = function(port) {
  return require('./lib/net/discovery-client').create(port);
}

exports.createPacketServer = function(port) {
  return require('./lib/net/packet-server').create(port);
}

exports.createPacketClient = function(port) {
  return require('./lib/net/packet-client').create(port);
}

exports.Header = require('./lib/packet/header');
exports.Packet = require('./lib/packet/packet');
exports.DataType = require('./lib/packet/data-type');
exports.Code = require('./lib/packet/code');
exports.Type = require('./lib/packet/type');
