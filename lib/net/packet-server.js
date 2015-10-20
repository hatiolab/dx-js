'use strict'

var net = require('net');

// var Type = require('../packet/type');
// var Code = require('../packet/code');
// var DataType = require('../packet/data-type');

// var Header = require('../packet/header');
// var Packet = require('../packet/packet');

function PacketServer(port) {
  this.port = port;
  this.clients = [];
}

PacketServer.prototype.start = function() {

  var clients = this.clients;

  var server = this.socket = net.createServer(function(socket) {

    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    // TODO session management.
    clients.push(socket);

    // TODO Send a connected event.

    socket.on('data', function (data) {
      // TODO. Handle messages
      // Logging here for audit
    });

    socket.on('end', function () {
      clients.splice(clients.indexOf(socket), 1);
      // TODO. invoke disconnect event internally.
    });

  }).listen(this.port);

  server.on('listening', function() {
    var address = server.address();

    console.log('packet server has a new connection : ' + address.address, + ":" + address.port);
  });

  server.on('close', function() {

    console.log('packet server is now closed');
  });

  server.on('error', function() {

    console.log('packet server error occurred');
  });
}

PacketServer.prototype.broadcast = function(packet) {
  var buffer = packet.toBuffer();

  this.clients.forEach(function (client) {

    this.socket.send(buffer, 'hex', function(err, bytes) {
      if(err)
        throw err;
      console.log('packet server sent message to client');
    });
  });
}

PacketServer.prototype.stop = function() {
  console.log('packet server stopped!');
}

exports.create = function(port) {
  return new PacketServer(port);
}
