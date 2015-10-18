var dx = require('../index.js');

var discoveryServer = dx.createDiscoveryServer();
var discoveryClient = dx.createDiscoveryClient();

discoveryServer.start();
discoveryClient.start();

discoveryClient.stop();
discoveryServer.stop();
