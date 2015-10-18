var ByteBuffer = require('bytebuffer');

var Header = require('../lib/packet/header.js');

var header = new Header(1, 2, 3);

var buffer = new ByteBuffer(header.length);

header.marshalling(buffer);

buffer.flip();

header = new Header();
header.unmarshalling(buffer);

console.log("Header packetSize : " + header.packetSize);
console.log("Header type : " + header.type);
console.log("Header code : " + header.code);
console.log("Header dataType : " + header.dataType);