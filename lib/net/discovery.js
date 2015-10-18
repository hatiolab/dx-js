'use strict'

exports.port = function(port) {
  return port || config.net.discovery["default-port"];
}

exports.broadcastAddress = function() {
  return config.net.discovery["broadcast-address"];
}

exports.socketType = function() {
  return config.net.discovery["socket-type"];
}
