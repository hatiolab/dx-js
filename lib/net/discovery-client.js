'use strict'

var dgram = require('dgram');

var Discovery = require('./discovery');

var Type = require('../packet/type');
var Code = require('../packet/code');
var DataType = require('../packet/data-type');
var Primitive = require('../data/primitive');

var Header = require('../packet/header');
var Packet = require('../packet/packet');

function DiscoveryClient(port) {
  Discovery.port = port;
}

DiscoveryClient.prototype.start = function() {
  var client = this.socket = dgram.createSocket(Discovery.socketType);

  this.socket.on('message', function(message, remote) {
    var packet = new Packet(new Header(), new Primitive());
    packet.from(message);

    console.log('discovery client found packet server : ' + remote.address + ':' + packet.data.s32);
  });

  this.socket.on('listening', function() {
    var address = client.address();
    console.log('discovery client start to listen on ' + address.address + ":" + address.port);
  });

  var self = this;

  this.socket.bind(0, function() {
    client.setBroadcast(true);
    console.log('discovery client bound to ' + client.address().port);

    self.send();
  });
}

DiscoveryClient.prototype.send = function() {
  var data = new Primitive();
  data.s32 = this.socket.address().port;

  var packet = new Packet(new Header(Type.DISCOVERY, Code.DISCOVERY_REQUEST, DataType.PRIMITIVE), data);

  var buffer = packet.toBuffer();
  this.socket.send(buffer, 0, buffer.length, Discovery.port, Discovery.broadcastAddress, function(err, bytes) {
    if(err)
      throw err;
    console.log('discovery client sent discovery message ' + bytes + ' bytes');
  });
}

DiscoveryClient.prototype.stop = function() {
  console.log('discovery client stopped!');
}

exports.create = function(port) {
  return new DiscoveryClient(port);
}
