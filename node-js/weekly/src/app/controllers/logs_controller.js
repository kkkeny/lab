load('application');

before(loadLog, {
    only: ['show', 'edit', 'update', 'destroy']
});

before(use('requireUser'),{
    except: 'sendmail'
});

action('new', function () {
    this.log = new Log;
    render();
});

action(function create() {
    User.find(req.session.current_user.id, function (err, user) {
        req.body.Log.atime = new Date(req.body.Log.atime) * 1;
        user.logs.create(req.body.Log, function (err, log) {
            respondTo(function (format) {
                format.json(function () {
                    if (err) {
                        send({code: 500, error: log && log.errors || err});
                    } else {
                        redis.sadd(log.user_id+'_i', log.indicator.trim());
                        redis.sadd(log.user_id+'_p', log.platform.trim());
                        send({code: 200, data: log.toObject()});
                    }
                });
            });
        });
    });
});

action(function index() {
    var uid = req.session.current_user.id;

    var now = new Date(),
        today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), '00', '00') * 1,
        yesterday = today - 1000*60*60*24;
        //tomorrow = today + 1000*60*60*26;
    var qdate = null;
    if(params.date){
        qdate = new Date(params.date +' 00:00') *1;
    }

    var sdate = qdate || yesterday;
    var edate = sdate + (1000*60*60*24) -1;

    //查询条件
    var query = {
        where:{
            user_id: uid,
            atime: {between: [sdate, edate-1]}
        },
        order: 'indicator'
    };
    //之前  当前  未来
    if(sdate >= today) {
        redirect(pathTo.logs);
        return false;
    }else{
        //当前
        redis.multi()
            .hget(uid, sdate)
            .smembers(uid+'_i')
            .smembers(uid+'_p')
            .exec(function (err, replies) {
                this.overview = replies[0] || "";
                this.indicators = replies[1];
                this.platforms = replies[2];
            });
        /*
         *  如果昨天的数据为0 查询上次有数据的内容当天数据 是否为0  如果不为0 进行复制
         * */


         Log.all(query, function(err, count){
             redis.hexists(uid, sdate, function(err, data){
                 if(count.length < 1 && sdate == yesterday && data < 1){
                     var q1 = {
                         where:{
                             user_id: uid
                         },
                         order: 'ctime DESC',
                         limit:5
                     };
                     Log.all(q1, function(err, logs){
                         if(logs.length < 1){
                             render({
                                 logs: [],
                                 date: sdate
                             });
                         }else{
                             //clone desc
                             redis.hget(uid, '_tmp', function(err, data){
                                 if(data  && data.length>0){
                                     redis.hset(uid, sdate, data);
                                     this.overview = data;
                                 }
                             })

                             var predate = new Date(logs[0]['atime']);
                             predate.setHours(0);
                             predate.setMinutes(0);
                             predate.setSeconds(0);
                             predate.setMilliseconds(0);
                             //clone logs
                             var q2 = {
                                 where:{
                                     user_id: uid,
                                     atime: {between:[ predate * 1, predate * 1 + 1000*60*60*24 -1]}
                                 },
                                 order: 'indicator'
                             };
                             Log.iterate(q2, function(obj, next, i){
                                 //clone & clear data
                                 obj.atime = sdate;
                                 obj.remark = "";
                                 obj.status = "1";
                                 obj.method = "";
                                 obj.id = null;
                                 Log.create(obj, function(err, data){
                                     next();
                                 });
                             }, function(err){
                                 //over & query all
                                 Log.all(query, function (err, logs) {
                                     render({
                                         logs: logs,
                                         date: sdate
                                     });
                                 });
                             })
                         }
                     })
                 }else{
                     Log.all(query, function (err, logs) {
                         render({
                             logs: logs,
                             date: sdate
                         });
                     });
                 }
             })

        })
    }
});

action(function show() {
    switch(params.format) {
        case "json":
            send({code: 200, data: this.log});
            break;
        default:
            render();
    }
});

action(function edit() {
    switch(params.format) {
        case "json":
            send(this.log);
            break;
        default:
            render();
    }
});

action(function update() {
    var log = this.log;
    this.log.updateAttributes(body.Log, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: log && log.errors || err});
                } else {
                    send({code: 200, data: log});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', '日志更新成功');
                    redirect(pathTo.logs);
                } else {
                    flash('error', '日志更新失败');
                    redirect(pathTo.logs);
                }
            });
        });
    });
});

action(function destroy() {
    this.log.destroy(function (error) {
        respondTo(function (format) {
            format.html(function () {
                if (error) {
                    flash('error', '日志删除失败');
                } else {
                    flash('info', '日志删除成功');
                }
                redirect(pathTo.logs);
            });
        });
    });
});

//return json
action('list', function(){
    var userid = req.session.current_user.id;
    redis.smembers(userid+'_i', function(err, data){
        this.indicators = data;
        redis.smembers(userid+'_p', function(err, data){
            this.platforms = data;
            respondTo(function (format) {
                format.json(function () {
                    if (err) {
                        send({code: 500, error: '数据错误'});
                    } else {
                        send({code: 200, indicator: this.indicators, platform: this.platforms});
                    }
                })
            });
        });
    });
});

action('desc', function(){
    redis.hset(req.session.current_user.id, new Date(req.body.date + ' 00:00')*1, req.body.desc);
    redis.hset(req.session.current_user.id, '_tmp', req.body.desc);
    this.overview = req.body.desc;
    this.date = req.body.date;
    flash('info', '概述添加成功');
    redirect(pathTo.logs);
})

action('deltag', function(){
    var userid = req.session.current_user.id;
    redis.srem(userid+'_'+params.type, params.name, function(err, data){
        if (err) {
            send({code: 500, error: '删除失败'});
        } else {
            send({code: 200});
        }
    });
})

function loadLog() {
    Log.find(params.id, function (err, log) {
        if (err || !log) {
            if (!err && !log && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(pathTo.logs);
        } else {
            this.log = log;
            next();
        }
    }.bind(this));
}