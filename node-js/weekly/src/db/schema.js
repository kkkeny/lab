/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var User = describe('User', function () {
    property('name', String, {index: true});
    property('password', String);
    property('remember_token', String, {index: true});
    property('mail', String);
    property('username', String);
    property('phone', String);
    property('joindate', Date);
    property('position', String);
    property('department', String);
    property('leavedate', Date);
    property('is_admin', Boolean, {default: false});
    set('restPath', pathTo.users);
});

var Micropost = describe('Micropost', function () {
    property('content', String);
    property('user_id', String, {index: true});
    set('restPath', pathTo.microposts);
});

Micropost.belongsTo(User, {as:'author', foreignKey: 'user_id'});
User.hasMany(Micropost, {as:'posts', foreignKey: 'user_id'});

var Log = describe('Log', function () {
    property('user_id', String, {index: true});
    property('indicator', String);
    property('platform', String);
    property('status', String);
    property('remark', String);
    property('method', String);
    property('ctime', Number, {index: true});
    property('mtime', Number);
    property('atime', Number);
    set('restPath', pathTo.logs);
});

Log.belongsTo(User, {as:'author', foreignKey: 'user_id'});
User.hasMany(Log, {as:'logs', foreignKey: 'user_id'});