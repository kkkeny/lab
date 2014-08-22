var crypto = require('crypto');
function digest(data){
    return crypto.createHash('sha1').update(new Buffer(data)).digest().toString('base64');
}

function createRememberToken(){
    this.remember_token = User.encrypt(User.new_remember_token);
}

module.exports = function (compound, User) {
    User.validatesUniquenessOf('name', {message: '用户名不能重复'});
    //User.validatesFormatOf('name', {with:/^[\w\d.]+(@tadu.com)$/i});
    User.validatesLengthOf('password', {min: 6, message: {min: '密码长度太短'}});
    //User.validate


    // define User here
    User.beforeCreate = function(next, data) {
        // use data argument to update object
        data.password = User.encrypt(data.password);
        data.mail = data.name+"@tadu.com";
        data.username = "个人设置";
        next();
    };


    User.newRememberToken = function(){
        //SecureRandom.urlsafe_base64
        return crypto.randomBytes(256).toString('base64');
    }

    User.encrypt = function(token){
        //Digest::SHA1.hexdigest(token.to_s)
        if(token)
            return crypto.createHash('sha1').update(new Buffer(token)).digest().toString('base64');
    }

    User.authenticate = function(user, cb){
        User.findOne({
            where:{name:user.name}
        },function(err, dbuser){
            if(err){
                cb(err);
            }else{
                if(dbuser && User.encrypt(user.password) == dbuser.password){
                    cb(err,dbuser);
                }else if(!dbuser){
                    cb('nouser');
                }else{
                    cb('errpwd');
                }
            }

        });
    };

};