var express = require('express');

module.exports = function (compound) {
    var app = compound.app;

    app.configure('production', function () {
        app.set('quiet', 'all');
        app.enable('log actions');
        app.enable('view cache');
        //app.enable('model cache');
        //app.enable('eval cache');
        //app.enable('merge javascripts');
        //app.enable('merge stylesheets');
        //app.enable('assets timestamps');
        app.use(express.errorHandler());
    });
};
