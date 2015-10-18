'use strict'

function Packet(header, data) {
  this._header = header;
  this._data = data;
}

Packet.prototype.header = function(header) {
  if(arguments.length > 0)
    this._header = header;

  return this._header;
}

Packet.prototype.data = function(data) {
  if(arguments.length > 0)
    this._data = data;

  return this._data;
}

/* Marshallable */

Packet.prototype.length = function() {
  var len = this._header.length();
  if(this._data)
    len += this._data.length();

  return len;
}

Packet.prototype.marshalling = function(buffer) {
  this._header.packetSize(this.length());

  this._header.marshalling(buffer);
  if(this._data)
    this._data.marshalling(buffer);
}

Packet.prototype.unmarshalling = function(buffer) {
  this._header.unmarshalling(buffer);
  if(this._data)
    this._data.unmarshalling(buffer);
}

exports = Packet;