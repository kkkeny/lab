##周报系统部署流程
###环境依赖
* git
* node
* redis
* mongodb
	
###node 安装
先安装git，然后逐行执行以下命令

curl https://raw.github.com/creationix/nvm/master/install.sh | sh

source ~/.nvm/nvm.sh

nvm install 0.10

nvm use 0.10

nvm alias default 0.10

node -v  测试是否安装成功

###项目部署

svn co http://svn.kaiqi.com/tadu/tech/trunk/html/dev/frontend_lab/node-js/weekly/src

cd src

编辑 conf/database.js  conf/environment.js  conf/initializers/redis_client.js 将ip和port做相应的替换

回到src 目录

npm install

export NODE_ENV=test

node . 3000 127.0.0.1 &   [127.0.0.1换成服务器ip]  可以访问服务了 http://ip:3000


###生产环境启动
pm2 start processes.json

