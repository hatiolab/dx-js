'use strict'

var expect = require('chai').expect;

var Buffer = require('buffer');
var Primitive = require('../../lib/data/primitive');

describe('primitive', function() {
  describe('getter', function() {
    it('should be same as its set value!', function() {
      var data = new Primitive();

      data.u32 = 1000000;
      expect(data.u32).equal(1000000);

      data.s32 = -1000000;
      expect(data.s32).equal(-1000000);

      data.u16 = 65535;
      expect(data.u16).equal(65535);

      data.s16 = -12345;
      expect(data.s16).equal(-12345);

      data.u8 = 129;
      expect(data.u8).equal(129);

      data.s8 = -127;
      expect(data.s8).equal(-127);

      data.f32 = -127.000;
      expect(data.f32).equal(-127.000);
    });
  });
});

