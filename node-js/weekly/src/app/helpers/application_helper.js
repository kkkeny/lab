module.exports = {
    signIn: function(user){
        //var remember_token = User.newRememberToken();
        //res.cookie('remember_token', remember_token);
        //user.updateAttribute('remember_token', User.encrypt(remember_token));
        //req.session.current_user = user;
    },
    signedIn: function(){
        return this.req.session.current_user || false;
    },
    isAdmin: function(){
        return this.req.session.current_user.is_admin;
    },
    signOut: function(){
        //req.session.current_user = null;
        //cookies.delete('remember_token');
    },
    formatDate: function(timestamp){
        if(timestamp == null) return "";
        var date = new Date(timestamp);
        return date.getFullYear() + "-" + (date.getMonth()>9?date.getMonth():"0"+(date.getMonth()+1)) + "-" + (date.getDate()>9?date.getDate():"0"+date.getDate());
    },
    formatTime: function(){

    },
    isToday: function(timestamp){
        var today = new Date();
        date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), '00', '00');
        return  (timestamp >= date*1-1000*60*60*24) &&  timestamp < (date*1)
    }
};