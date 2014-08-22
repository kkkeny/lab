module.exports = function (compound, Log) {
    // define Log here
    //Log.validatesUniquenessOf('indicator',{message:'指标内容不能为空'});
    Log.validatesPresenceOf('indicator', {message: '指标内容不能为空'});
    Log.validatesPresenceOf('platform', {message: '平台内容不能为空'});

    Log.beforeCreate = function(next, data) {
        // use data argument to update object
        var date = new Date() * 1;
        data.atime = new Date(data.atime) * 1;
        data.mtime = date;
        data.ctime = date;
        next();
    };

    Log.beforeUpdate = function(next, data){
        data.mtime = new Date()*1;
        next();
    }

};