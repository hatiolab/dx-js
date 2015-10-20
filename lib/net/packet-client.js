'use strict'

var net = require('net');

// var Type = require('../packet/type');
// var Code = require('../packet/code');
// var DataType = require('../packet/data-type');

// var Header = require('../packet/header');
// var Packet = require('../packet/packet');

function PacketClient(port) {
  this.port = port;
}

PacketClient.prototype.start = function() {

  var client = this.socket = new net.Socket();

  client.connect(this.port, '127.0.0.1', function() {
    console.log('packet client connected');
    client.write('Hello, server! Love, Client.');
  });

  client.on('data', function(data) {
    console.log('packet client received data : ' + data);
  });

  client.on('close', function() {
    console.log('packet client connection closed');
  });
}

PacketClient.prototype.send = function(packet) {

  var buffer = packet.toBuffer();

  this.socket.send(buffer, 'hex', function(err, bytes) {
    if(err)
      throw err;
    console.log('packet client sent message to server');
  });
}

PacketClient.prototype.stop = function() {
  console.log('packet client stopped!');
}

exports.create = function(port) {
  return new PacketClient(port);
}
