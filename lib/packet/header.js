'use strict'

function Header(type, code, dataType) {
  this._packetSize = 0;
  this._type = type;
  this._code = code;
  this._dataType = dataType;
}

['packetSize', 'type', 'code', 'dataType'].forEach(function(prop) {
  var name = '_' + prop;
  Object.defineProperty(Header.prototype, prop, {
    get: function() {
      return this[name];
    },
    set: function(val) {
      this[name] = val;
    }
  })
});

/* Marshallable */

Object.defineProperty(Header.prototype, 'length', {
  get: function() {
    return 8;
  }
});

Header.prototype.marshalling = function(buffer) {
  buffer.writeInt32(this.packetSize);
  buffer.writeInt8(this.type);
  buffer.writeInt8(this.code);
  buffer.writeInt8(this.dataType);
  buffer.writeInt8(0);
}

Header.prototype.unmarshalling = function(buffer) {
  this.packetSize = buffer.readInt32();
  this.type = buffer.readInt8();
  this.code = buffer.readInt8();
  this.dataType = buffer.readInt8();
  buffer.readInt8(); // dummy
}

module.exports = Header;
