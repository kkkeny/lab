before('protect from forgery', function () {
  protectFromForgery('dba99ee094a89ad0ac2abab11c95f534dd3d566f');
});


publish('requireUser', signedInUser);
function signedInUser() {
    if(!req.session.current_user){
        redirect(pathTo.root);
    }else{
        next();
    }
}

function correctUser() {
    if(!req.session.current_user || req.session.current_user.id != req.params.id){
        redirect(pathTo.root);
    }else{
        next();
    }
}

function adminUser() {
    if(!req.session.current_user.is_admin){
        redirect(pathTo.root);
    }else{
        next();
    }
}