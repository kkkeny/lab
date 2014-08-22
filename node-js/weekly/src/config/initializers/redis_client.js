module.exports = function(compound) {
    var app = compound.app;
    var redis = require("redis");
        client = redis.createClient(6379, '192.168.2.94');

    compound.controllerExtensions.redis = client;
};
