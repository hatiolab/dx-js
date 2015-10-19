'use strict'

var expect = require('chai').expect;

var DataType = require('../../lib/packet/data-type');
var Primitive = require('../../lib/data/primitive');

describe('data-type', function() {
  describe('createData', function() {
    it('should create a proper object!', function() {
      expect(DataType.createData(DataType.PRIMITIVE)).to.be.instanceOf(Primitive);
    });
  });
});

