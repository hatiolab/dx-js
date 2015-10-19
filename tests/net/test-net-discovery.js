var dx = require('../../index');

var discoveryServer = dx.createDiscoveryServer();
var discoveryClient = dx.createDiscoveryClient();

discoveryServer.start();
discoveryClient.start();

discoveryClient.stop();
discoveryServer.stop();
