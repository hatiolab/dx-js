'use strict'

var DataType = require('./data-type');
var Header = require('./header');

var ByteBuffer = require('bytebuffer');

function Packet(header, data) {
  this.header = header || new Header();
  if(!data)
    this._data = DataType.createData(this.header.dataType);
}

['header', 'data'].forEach(function(prop) {
  var name = '_' + prop;
  Object.defineProperty(Packet.prototype, prop, {
    get: function() {
      return this[name];
    },
    set: function(val) {
      this[name] = val;
    }
  })
});

Packet.prototype.toBuffer = function() {
  var buffer = new ByteBuffer(this.length);
  this.marshalling(buffer);

  return buffer.buffer;
}

/* Marshallable */

Object.defineProperty(Packet.prototype, 'length', {
  get: function() {
    var len = this.header.length;
    if(this.data)
      len += this.data.length;

    return len;
  }
});

Packet.prototype.marshalling = function(buffer) {
  this.header.packetSize = this.length;

  this.header.marshalling(buffer);

  if(this.data)
    this.data.marshalling(buffer);
}

Packet.prototype.unmarshalling = function(buffer) {
  this.header.unmarshalling(buffer);

  this.data = DataType.createData(this.header.dataType);

  if(this.data)
    this.data.unmarshalling(buffer);
}

Packet.from = function(message) {
  var bytebuffer = ByteBuffer.fromBinary(message);

  var packet = new Packet();

  packet.unmarshalling(bytebuffer);

  return packet;
}

module.exports = Packet;
