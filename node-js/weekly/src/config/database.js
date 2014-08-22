module.exports = {
    development: {
        driver:   'mongodb',
        url:      'mongodb://192.168.2.94/tos-dev'
    },
    test: {
        driver:   'mongodb',
        url:      'mongodb://192.168.2.94/tos-test'
    },
    production: {
        driver:   'mongodb',
        url:      'mongodb://192.168.2.94/tos-production'
    }
};
