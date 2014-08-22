load('application');

before(signedInUser, {
    only: ['create' ,'destroy']
})

before(currentUser, {
    only: 'destroy'
})



action('index', function() {

});


action('create', function() {
    User.find(req.session.current_user.id, function (err, user) {
        user.posts.create(req.body, function(err, post){
            if (err) {
                flash('error', 'Micropost create error');
                redirect(pathTo.root);
            } else {
                flash('info', 'Micropost created!');
                redirect(pathTo.user(user));
            }
        })
    });
});

action('destroy', function() {
    this.post.destroy();
    redirect(pathTo.root);
});

function signedInUser() {
    if(!req.session.current_user){
        flash('info', 'Please sign in');
        redirect(pathTo.signin);
    }
    next();
}

function currentUser() {
//    this.post = req.session.current_user.posts.findOne({
//        where:{
//            id: req.params[id]
//        }
//    }, function(err, post) {
//        if(err)
//            redirect(pathTo.root);
//        else
//            this.post  = post;
//    });

}