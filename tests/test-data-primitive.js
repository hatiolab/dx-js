var Buffer = require('buffer');
var Primitive = require('../lib/data/primitive');

var data = new Primitive();

data.u32 = 1000000;
console.log("Primitive " + data.u32);

data.s32 = -1000000;
console.log("Primitive " + data.s32);

data.u16 = 65535;
console.log("Primitive " + data.u16);

data.s16 = -12345;
console.log("Primitive " + data.s16);

data.u8 = 129;
console.log("Primitive " + data.u8);

data.s8 = -127;
console.log("Primitive " + data.s8);

data.f32 = -127.123;
console.log("Primitive " + data.f32);
