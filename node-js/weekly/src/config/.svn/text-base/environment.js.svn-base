module.exports = function (compound) {

    var app = compound.app;
    var express = require('express');
    var RedisStore = require('connect-redis')(express);
    /*
    var redis = require("redis");
    app.redisClient = redis.createClient();
    */

    app.configure(function(){
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        //compound.loadConfigs(__dirname);
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        //app.use(express.session({secret: 'secret'})); // cookie lives 2 hours
        app.use(express.session({secret: 'secret', cookie: {maxAge: 7200000}, store: new RedisStore({host:'192.168.2.94', port:6379, db: 'sessions'})}));
        app.use(express.methodOverride());
        app.use(app.router);
    });

};
