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
      this[name]
    }
  })
});

// Object.defineProperty(Header.prototype, 'packetSize', {
//   get: function() {
//     return this._packetSize;
//   },
//   set: function(val) {
//     this._packetSize = val;
//   }
// });

// Object.defineProperty(Header.prototype, 'type', {
//   get: function() {
//     return this._type;
//   },
//   set: function(val) {
//     this._type = val;
//   }
// });

// Object.defineProperty(Header.prototype, 'code', {
//   get: function() {
//     return this._code;
//   },
//   set: function(val) {
//     this._code = val;
//   }
// });

// Object.defineProperty(Header.prototype, 'dataType', {
//   get: function() {
//     return this._dataType;
//   },
//   set: function(val) {
//     this._dataType = val;
//   }
// });

/* Marshallable */

Object.defineProperty(Header.prototype, 'length', {
  get: function() {
    return 8;
  }
});

Header.prototype.marshalling = function(buffer) {
  buffer.writeInt32(this._packetSize);
  buffer.writeInt8(this._type);
  buffer.writeInt8(this._code);
  buffer.writeInt8(this._dataType);
  buffer.writeInt8(0);
}

Header.prototype.unmarshalling = function(buffer) {
  this._packetSize = buffer.readInt32();
  this._type = buffer.readInt8();
  this._code = buffer.readInt8();
  this._dataType = buffer.readInt8();
}

module.exports = Header;