var dx = require('../../index');

var server = dx.createPacketServer(2015);

server.start();

var count = 100;

while(count--)
  dx.createPacketClient(2015).start();
