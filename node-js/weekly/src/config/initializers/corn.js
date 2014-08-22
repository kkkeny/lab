module.exports = function(compound){
    //console.log(process.argv[2]);
    if(process.argv[2] != 3010) return false; // single server for send corntab
    compound.cron.daemonize_route('send mail',{
        route: 'logs#sendmail',
        params: {
            a: 1
        },
        cronTime: '00 00 10 * * 1-5',
        //cronTime: '* * * * *',
        start: false
        //timeZone: 'Asia/Beijing'
    });
    compound.cron.start('send mail');
}
