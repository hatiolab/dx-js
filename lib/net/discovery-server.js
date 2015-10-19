'use strict'

var dgram = require('dgram');

var Discovery = require('./discovery');

var Type = require('../packet/type');
var Code = require('../packet/code');
var DataType = require('../packet/data-type');

var Primitive = require('../data/primitive');

var Header = require('../packet/header');
var Packet = require('../packet/packet');

function DiscoveryServer(port) {
  Discovery.port = port;
}

DiscoveryServer.prototype.start = function() {
  var server = this.socket = dgram.createSocket(Discovery.socketType);

  this.socket.on('message', function(message, remote) {
    var packet = new Packet(new Header(), new Primitive());
    packet.from(message);

    console.log('discovery server on message : Discovery Request from ' + remote.address + ':' + remote.port);

    var client_port = packet.data.s32;

    var header = packet.header;
    header.type = Type.DISCOVERY;
    header.code = Code.DISCOVERY_RESPONSE;
    header.dataType = DataType.PRIMITIVE;

    var data = new Primitive();
    data.s32 = server.address().port;

    packet.data = data;

    var buffer = packet.toBuffer();
    server.send(buffer, 0, buffer.length, client_port, remote.address, function(err, bytes) {
      if(err)
        throw err;
      console.log('discovery server response message ' + bytes + ' bytes');
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
  console.log('discovery server stopped!');
}

exports.create = function(port) {
  return new DiscoveryServer(port);
}
