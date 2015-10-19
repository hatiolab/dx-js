'use strict'

var dgram = require('dgram');

var Discovery = require('./discovery');

var Type = require('../packet/type');
var Code = require('../packet/code');
var DataType = require('../packet/data-type');

var Header = require('../packet/header');
var Packet = require('../packet/packet');

function DiscoveryClient(port) {
  Discovery.port = port;
}

DiscoveryClient.prototype.start = function() {
  var client = this.socket = dgram.createSocket(Discovery.socketType);

  this.socket.on('message', function(message, remote) {
    var packet = new Packet();
    packet.from(message);

    console.log('discovery client on message : Packet => ' + JSON.stringify(packet));
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
  var packet = new Packet(new Header(Type.DISCOVERY, Code.DISCOVERY_REQUEST, DataType.NONE));

  var buffer = packet.toBuffer();
  this.socket.send(buffer, 0, buffer.length, Discovery.port, Discovery.broadcastAddress, function(err, bytes) {
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
