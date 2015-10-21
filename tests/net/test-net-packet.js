var dx = require('../../index');

var Type = dx.Type;
var Code = dx.Code;
var DataType = dx.DataType;

var Header = dx.Header;
var Packet = dx.Packet;

var server = dx.createPacketServer(2015);

server.handler = function(socket, data) {
  var packet = Packet.from(data);

  console.log('Type : ' + JSON.stringify(packet));
}

server.start(function() {
  var count = 10;

  var clients = [];

  while(count--) {
    clients[count] = dx.createPacketClient(2015);
    clients[count].start(function(client) {
      var packet = new Packet(new Header(Type.EVENT, Code.EVT_CONNECT, DataType.NONE));
      client.send(packet);
    });
  }
});
