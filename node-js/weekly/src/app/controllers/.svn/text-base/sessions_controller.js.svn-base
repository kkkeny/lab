load('application');

action('filter', function(){
    if(req.session.current_user){
        redirect(pathTo.logs);
    }else if(!req.session.current_user && req.cookies.remember_token){
        var token = User.encrypt(req.cookies.remember_token);
        User.findOne({
            where:{remember_token: token}
        },function(err, user){
            if(!err){
                if(user){
                    req.session.current_user = user;
                    redirect(pathTo.logs);
                }else{
                    redirect(pathTo.signin);
                }
            }
        });
    }else{
        redirect(pathTo.signin);
    }
});

action('new', function() {
    this.user = {name:''};
    render('new',{layout:false});
});

action('create', function() {
    User.authenticate(req.body, function(err, user){
        if (err) {
            if(err === 'nouser'){
                flash('error', '用户名不存在,请重新输入');
            }else{

                flash('error', '用户与密码不匹配，请重新输入');
            };
            this.user = req.body;
            render('new');
        } else {
            flash('info', '登录成功');
            //signIn(user);
            if(req.body.autoin){
                var remember_token = User.newRememberToken();
                res.cookie('remember_token', remember_token);
                user.updateAttribute('remember_token', User.encrypt(remember_token));
            }else{
                res.clearCookie('remember_token');
            }
            //dict translate
            req.session.current_user = user;
            redirect(pathTo.root);

        }
    });
});

action('destroy', function() {
    //signOut();
    req.session.current_user = null;
    res.clearCookie('remember_token');
    redirect(pathTo.root);
});

//gen code for invite user;
action('keygen', function(){
    var code = User.encrypt(params.mail);
    redis.hset('invitecode', code, params.mail);
    send(code);
})
