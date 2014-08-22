exports.routes = function (map) {


    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    //map.all(':controller/:action');
    //map.all(':controller/:action/:id');
    map.resources('users');
    map.resources('logs');
    map.resources('sessions', {only: ['new', 'create', 'destroy']});
    map.resources('microposts', {only: ['create', 'destroy']});

    map.root('sessions#filter');

    map.get('about', 'static_pages#about');
    map.get('help', 'static_pages#help');
    map.get('home', 'static_pages#home');

    map.get('signup', 'users#new');
    map.get('users/:id/repwd', 'users#repwd');
    map.get('users/:id/tags', 'users#tags');
    map.post('uppwd/:id', 'users#uppwd');

    //map.post('Logs.:format? ', 'logs#create');
    //map.get('logs', 'logs#index');
    map.get('tags.:format?', 'logs#list');
    map.get('logdel/:id', 'logs#destroy');
    map.get('log/:id', 'logs#edit');
    map.get('day/:date', 'logs#index');
    map.get('deltag/:type/:name', 'logs#deltag');
    map.post('createdesc', 'logs#desc');

    //mailer
    map.post('mailcc', 'mailer#addcc');
    map.get('sendmail', 'mailer#single');
    //map.get('logsend','logs#automail');

    map.get('signin', 'sessions#new');
    map.get('signout', 'sessions#destroy');
    map.get('keygen/:mail', 'sessions#keygen');

    //map.get('home', 'app#home');
    //map.get('login', 'app#login');

};