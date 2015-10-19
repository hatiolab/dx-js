'use strict'

var Buffer = require('buffer').Buffer;

/* I don't know why I have not to use LittleEndian methods but BigEndian methods. */
var methods = {
  'u32': ['readUInt32BE', 'writeUInt32BE'],
  's32': ['readInt32BE', 'writeInt32BE'],
  'u16': ['readUInt16BE', 'writeUInt16BE'],
  's16': ['readInt16BE', 'writeInt16BE'],
  'u8': ['readUInt8', 'writeUInt8'],
  's8': ['readInt8', 'writeInt8'],
  'f32': ['readFloatBE', 'writeFloatBE'],
}

function Primitive() {
  this.buffer = new Buffer(4);
};

for(let type in methods) {
  Object.defineProperty(Primitive.prototype, type, {
    get: function() {
      return this.buffer[methods[type][0]].call(this.buffer);
    },
    set: function(val) {
      this.buffer.fill(0);
      this.buffer[methods[type][1]].call(this.buffer, val);
    }
  });
}

/* Marshallable */

Object.defineProperty(Primitive.prototype, 'length', {
  get: function() {
    return 4;
  }
});

Primitive.prototype.marshalling = function(buffer) {
  for(var i = 0;i < 4;i++)
    buffer.writeByte(this.buffer[i]);
}

Primitive.prototype.unmarshalling = function(buffer) {
  for(var i = 0;i < 4;i++)
    this.buffer[i] = buffer.readByte();
}

module.exports = Primitive;
