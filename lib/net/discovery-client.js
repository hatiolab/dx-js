'use strict'

var dgram = require('dgram');
var discovery = require('./discovery');

function DiscoveryClient(port) {
  this.port = discovery.port(port);
}

DiscoveryClient.prototype.start = function() {
  var client = this.socket = dgram.createSocket(discovery.socketType());

  this.socket.on('message', function(message, remote) {
    console.log('discovery client on message : ' + message + '\n');
  });

  this.socket.on('listening', function() {
    var address = client.address();
    console.log('discovery client listening on ' + address.address + ":" + address.port);
  });

  var self = this;

  this.socket.bind(0, function() {
    client.setBroadcast(true);
    console.log('discovery client bound to ' + client.address().port);

    self.send();
  });
}

DiscoveryClient.prototype.send = function() {
  var message = new Buffer('Some Data');
  this.socket.send(message, 0, message.length, this.port, discovery.broadcastAddress(), function(err, bytes) {
    if(err)
      throw err;
    console.log('discovery client sent message ' + bytes + ' bytes\n');
  });
}

DiscoveryClient.prototype.stop = function() {
  console.log('discovery client stopped!\n');
}

exports.create = function(port) {
  return new DiscoveryClient(port);
}