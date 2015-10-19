'use strict'

var expect = require('chai').expect;

var ByteBuffer = require('bytebuffer');

var Header = require('../../lib/packet/header');

describe('header', function() {
  describe('marshalling', function() {
    it('should be same as unmarshalled header!', function() {
      var type = 1;
      var code = 2;
      var dataType = 3;

      var header = new Header(type, code, dataType);
      var buffer = new ByteBuffer(header.length);

      header.marshalling(buffer);

      buffer.flip();

      header = new Header();
      header.unmarshalling(buffer);

      expect(header.type).equal(type);
      expect(header.code).equal(code);
      expect(header.code).equal(code);
      expect(header.length).equal(8);
    });
  });
});

