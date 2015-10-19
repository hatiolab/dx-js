'use strict'

var dgram = require('dgram');

var Discovery = require('./discovery');

var Type = require('../packet/type');
var Code = require('../packet/code');
var DataType = require('../packet/data-type');

var Header = require('../packet/header');
var Packet = require('../packet/packet');

function DiscoveryServer(port) {
  Discovery.port = port;
}

DiscoveryServer.prototype.start = function() {
  var server = this.socket = dgram.createSocket(Discovery.socketType);

  this.socket.on('message', function(message, remote) {
    var packet = new Packet();
    packet.from(message);

    console.log('discovery server on message : Packet => ' + JSON.stringify(packet));

    var header = packet.header;
    header.type = Type.DISCOVERY;
    header.code = Code.DISCOVERY_RESPONSE;
    header.dataType = DataType.PRIMITIVE;

    var buffer = packet.toBuffer();
    server.send(buffer, 0, buffer.length, remote.port, remote.address, function(err, bytes) {
      if(err)
        throw err;
      console.log('discovery server response message ' + bytes + ' bytes\n');
    });
  });

  this.socket.on('listening', function() {
    var address = server.address();
    console.log('discovery server listening on ' + address.address + ":" + address.port);
  });

  this.socket.bind(Discovery.port, function() {
    console.log('discovery server bound to ' + server.address().port);
  });
}

DiscoveryServer.prototype.stop = function() {
  console.log('discovery server stopped!\n');
}

exports.create = function(port) {
  return new DiscoveryServer(port);
}
