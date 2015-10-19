'use strict'

var port = config.net.discovery["default-port"];

function Discovery() {}

Object.defineProperty(Discovery, 'port', {
  get: function() {
    return port;
  },
  set: function(val) {
    if(typeof(val) == Number)
      port = val;
  }
});

Object.defineProperty(Discovery, 'broadcastAddress', {
  get: function() {
    return config.net.discovery["broadcast-address"];
  }
});

Object.defineProperty(Discovery, 'socketType', {
  get: function() {
    return config.net.discovery["socket-type"];
  }
});

module.exports = Discovery;
