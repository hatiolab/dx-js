'use strict'

var dgram = require('dgram');
var discovery = require('./discovery');

function DiscoveryServer(port) {
  this.port = discovery.port(port);
}

DiscoveryServer.prototype.start = function() {
  var server = this.socket = dgram.createSocket(discovery.socketType());

  this.socket.on('message', function(message, remote) {
    console.log('discovery server on message : ' + message + '\n');

    var message = new Buffer('Response Data');
    server.send(message, 0, message.length, remote.port, remote.address, function(err, bytes) {
      if(err)
        throw err;
      console.log('discovery server response message ' + bytes + ' bytes\n');
    });
  });

  this.socket.on('listening', function() {
    var address = server.address();
    console.log('discovery server listening on ' + address.address + ":" + address.port);
  });

  this.socket.bind(this.port, function() {
    console.log('discovery server bound to ' + server.address().port);
  });
}

DiscoveryServer.prototype.stop = function() {
  console.log('discovery server stopped!\n');
}

exports.create = function(port) {
  return new DiscoveryServer(port);
}