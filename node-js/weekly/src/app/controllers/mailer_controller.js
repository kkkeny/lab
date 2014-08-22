/**
 * Created by Superman on 2/10/14.
 */
load('application');

before(use('requireUser'), {
    except: ['automail' ]
});


action('addcc', function(){
    //校验地址 校验成功
    if(req.body.addrs.length >0){
        var adds =  req.body.addrs.split(',');
        var flag = false;
        adds.forEach(function(o, i){
            if(!/[a-zA-Z\.]+@tadu.com/.test(o)){
                flag = true;
                return false;
            }
        });
        if(flag) {
            send({code: 500, error: '数据格式错误'});
        } else {
            redis.hset(req.session.current_user.id, 'cc', req.body.addrs);
            send({code: 200});
        }
    }else{
        redis.hset(req.session.current_user.id, 'cc', "");
        send({code: 200});
    }
})

action('automail', function(req, res){
    // 增加状态 方式多个服务 发送多份
    var result = [];
    redis.lrange('dict:groups', 0, -1, function(err, grps){
        grps.forEach(function(grp, i){
            result[i] = {name: grp, users:[]};
        })
    })
    //select all user     set result[user.position]['users'].push(user);
    User.all(function(err, users){
        if(!err){

            //select all logs
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), '00', '00');
            var sdate = date * 1 - 1000*60*60*24;
            var edate = date * 1;
            var _yesterday = new Date(sdate);
            var yesterday = _yesterday.getFullYear()+'-'+(_yesterday.getMonth()+1)+'-'+_yesterday.getDate();

            Log.all({
                where:{
                    atime: {between:[sdate, edate-1]}
                },
                order: 'indicator'
            },function(err, logs){
                logs.forEach(function(log,i){
                    var ui = find(log.user_id);
                    try{
                        if(typeof users[ui]['log'] === 'undefined')
                            users[ui]['log'] = [];
                        users[ui]['log'].push(log);
                    }catch (e){
                        console.log(e);
                    }
                });

                //群组添加人员
                users.forEach(function(user,i){
                    if(result[user['position']] !=undefined && result[user['position']]['users'] != undefined && user.log!= undefined && user.log.length>0)
                        result[user['position']]['users'].push(user);

                    //人员添加描述
                    redis.hget(user['id'], _yesterday * 1, function(err, data){
                        user['desc'] = data || "";
                    })
                });

                //没有日志的组 不显示
                var filterd = result.filter(function(grp, i) {
                    if(grp.users.length>1)
                        return true;
                });

                //send(filterd);
                //render data  and  send email
                redis.smembers('emails', function(err, mails){
                    //template data option callback
                    sendEmail('mail_template/all', {groups: filterd}, {
                        to:'development' === compound.app.get('env')?'xinchao.wang@tadu.com':mails.join(','),
                        subject: yesterday+"汇总日报内容"
                    },function(err, success) {
                        if(err){
                            //send('error');
                        }
                        //send(result);
                    });
                })
            })
        }

        //find(key)   return obj
        function find(key){
            for(var i in users){
                if(users[i]['id'] == key){
                    return i;
                }
            }
        }
    })
});
//send email
action('single', function() {
    var user  = req.session.current_user;
    var now = new Date();
    var _yesterday = new Date(now*1 - (1000 * 60 *60 * 24));
    var yesterday = _yesterday.getFullYear()+'-'+(_yesterday.getMonth()+1)+'-'+_yesterday.getDate();
    var sdate = new Date(yesterday +' 00:00') * 1;
    var edate = sdate + (1000*60*60*24) -1;

    Log.all({where:{user_id: user.id, atime: {between:[sdate, edate]}}, order: 'indicator'},function (err, logs) {

        redis.multi()
            .smembers('emails')
            .hget(user.id, 'cc')
            .hget(user.id, sdate)
            .exec(function (err, data) {
                sendEmail(
                    'mail_template/single',  //template
                    {user: user, logs: logs, desc: data[2]||"", day: yesterday},  //data
                    {
                        to: 'development' === compound.app.get('env')? user.mail : data[0].join(','),
                        cc: data[1] || '',
                        subject: user.position + '组-' + user.username  + '['+yesterday+']' + '日报'
                    },
                    function(err, success) {
                        if(err){
                            flash('error', "邮件发送失败:"+err.data);
                        }
                        flash('info', "邮件发送成功，请到邮件中查收!");
                        redirect(pathTo.root);
                    })
            });
    });
})
