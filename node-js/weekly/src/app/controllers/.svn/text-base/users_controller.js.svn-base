load('application');

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy', 'repwd', 'uppwd']
});

before(use('requireUser'), {
    except: ['new', 'create']
});

//before(adminUser, {
//    only: 'destroy'
//})

action('new', function () {
    this.user = new User;
    render('new', {layout: false});
});

action(function create() {
    redis.hget('invitecode', req.body.User.code, function(err, data){
        if(!data){
            flash('error', '邀请码与注册用户名不匹配,请联系管理员。');
            redirect(pathTo.signup);
        }else{
            User.create(req.body.User, function (err, user) {
                if (err) {
                    flash('error', '用户注册失败');
                    redirect(pathTo.signup);
                } else {
                    flash('info', '用户创建成功');
                    //add email to cache;
                    //redis.  ass mail to cache;
                    //redis.sadd('emails', user.mail);

                    //注册后直接登录
                    var remember_token = User.newRememberToken();
                    res.cookie('remember_token', remember_token);
                    user.updateAttribute('remember_token', User.encrypt(remember_token));

                    req.session.current_user = user;
                    redirect(pathTo.root);
                }
            });
        }

    });
});

action(function index() {
    var page = req.param('page') || 1;
    //User.paginate({order: 'title', where: {'postStatus':'ACTIVE'}, limit: 2, page: page}, function (err, users) {
    User.paginate({limit: 2, page: page}, function (err, users) {
        render({users: users});
    });
});

action('show', function() {
    var page = req.param('page') || 1;
    Micropost.paginate({limit: 5, page: page, where: {user_id: params.id}}, function (err, posts) {
        //console.log(posts);
        render({posts: posts});
    });

});

action(function edit() {
    //return groups and departments
    redis.lrange("dict:departments",0 ,-1 ,function(err, deps){
        redis.lrange("dict:groups",0 ,-1 ,function(err, grps){
            render({deps: deps, grps: grps});
        });
    });
});

action(function update() {
    var user = this.user;
    delete body.User.password;
    delete body.User.name;
    this.user.updateAttributes(body.User, function (err, user) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: user && user.errors || err});
                } else {
                    send({code: 200, data: user});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', '更新成功');
                    //dict translate
                    req.session.current_user = user;
                    redirect(pathTo.edit_user(user));
                } else {
                    flash('error', '更新失败');
                    redirect(pathTo.edit_user(user));
                }
            });
        });
    });
});

action(function destroy() {
    this.user.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', '不能删除用户');
                } else {
                    flash('info', '用户删除成功');
                }
                send("'" + pathTo.users + "'");
            });
        });
    });
});



//reset password
action('repwd', function() {
    render('repwd');
})
//post update password
action('uppwd', function(){
    var user = this.user;
    if(User.encrypt(req.param('now-password')) !== user.password){
        flash('error', '当前密码不正确,请重新输入!');
        redirect(pathTo.repwd_user(user));
    }else if(req.param('new-password') !== req.param('confirm_password')){
        flash('error', '两次输入的密码不一致!');
        redirect(pathTo.repwd_user(user));
    }else{
        this.user.updateAttribute('password', User.encrypt(req.param('new-password')), function (err, user) {
            if (err) {
                flash('error', '修改失败');
            } else {
                flash('info', '密码修改成功!');
            }
            redirect(pathTo.repwd_user(user));
        });
    }
})
//


//show tags
action('tags', function(){
    var uid = req.session.current_user.id;

    redis.multi()
        .hget(uid, 'cc')
        .smembers(uid+'_i')
        .smembers(uid+'_p')
        .exec(function (err, replies) {
            this.addrs = replies[0] || "";
            this.indicators = replies[1];
            this.platforms = replies[2];
            render('tags');
        });
})

//before load user
function loadUser() {
    User.find(params.id, function (err, user) {
        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({code: 404, error: '没有用户'});
            }
            redirect(pathTo.root);
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}


