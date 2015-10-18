'use strict'

var Header = require('./header');
var ByteBuffer = require('bytebuffer');

function Packet(header, data) {
  this._header = header || new Header();
  this._data = data;
}

['header', 'data'].forEach(function(prop) {
  var name = '_' + prop;
  Object.defineProperty(Packet.prototype, prop, {
    get: function() {
      return this[name];
    },
    set: function(val) {
      this[name]
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
    var len = this._header.length;
    if(this._data)
      len += this._data.length;

    return len;
  }
});

Packet.prototype.marshalling = function(buffer) {
  this._header.packetSize = this.length;

  this._header.marshalling(buffer);
  if(this._data)
    this._data.marshalling(buffer);
}

Packet.prototype.unmarshalling = function(buffer) {
  this._header.unmarshalling(buffer);
  if(this._data)
    this._data.unmarshalling(buffer);
}

Packet.prototype.from = function(message) {
  var bytebuffer = ByteBuffer.fromBinary(message);
  this.unmarshalling(bytebuffer);
}

module.exports = Packet;