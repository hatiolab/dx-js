#!/usr/bin/env node

var dx = require('../index.js');

var port;

process.argv.forEach(function (val, index, array) {
  switch(index) {
    case 2:
      port = parseInt(val);
      break;
    default:
  }
});

console.log("Discovery Port : " + port);

var discoveryClient = dx.createDiscoveryClient(port);

discoveryClient.start();
