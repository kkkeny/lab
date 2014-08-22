#脚本化http

##什么是http

	http Hypertext Transfer Protocol 
	规定了浏览器如何请求文档
	如何向服务器传送表单内容
	如何响应请求和传送
	
	有资源地址就会有请求 例如link img script iframe
	
	http://www.cnblogs.com/zrtqsk/p/3746891.html
	http://www.cnblogs.com/wunaozai/p/3733432.html
	http://my.oschina.net/u/142836/blog/170179
	
##XMLHttpRequest
1. 创建一个XMLHttpRequest 对象
2. 指定一个http请求地址 并向服务器提交数据
3. 同步或者异步的处理 服务器端的响应
	
		//i7+ and not ie
		var request = new XMLHttpRequest();
		
		//ie 5-6
		var request = new ActiveXObject('Msxml2.XMLHTTP');
		var request = new ActiveXObject('Microsoft.XMLHTTP');
		
		function getRequestInstance(){
			var req = null;
			try{
				req = new XMLHttpRequest();
			}catch{
				try{
					req = new ActiveXObject('Msxml2.XMLHTTP');
				}catch{
					req = new ActiveXObject('Microsoft.XMLHTTP');
				}
			}
			return req;
		}
		
		
		var  request = getRequestInstance();
		
		/**
			@param string {GET|POST} request method  
			@param string 
			@param boolean 同步方式请求 还是异步方式请求
			@param string 授权
			@param string 
		*/
		request.open('GET|POST', URL, sync, username, password)
		
		//设置请求头
		request.setRequestHeader('User-agent', 'XMLHttpRequest');
		
		//发送数据请求服务器
		request.send(null)	 如果是get方式请求， 参数为null
		如果是post方式请求 数据格式为 key=value&key=value
		
		//同步请求实例处理响应 
		if (request.status == 200) {
			console.log(request.responstText)
			request.getResponseHeader('Content-Type');
		} else {
			
		}
		
		//异步请求
		readyState
		0 open()还没有调用
		1 open()已经调用，但是send()还没有调用
		2 send()已经调用，但是服务器还没有响应
		3 正在从服务器接受数据，   ie ff 不同
		4 服务器响应完成
						
		request.onreadystatechange = function() {
			if(request.readyState === 4){
				if(request.status === 200){
					console.log(req.responseText);
				}
			}	
		}
		
		//取消请求
		request.abort();
		
### Ajax 与动态脚本化
	
	
	ajax: Asynchronous JavaScript and XML
	
	
### 什么是json
	
	http://www.json.org/json-zh.html

### 什么是jsonp
		
	由于XMLHttpRequest 具有同援策略的安全机制，所以要实现跨域请求提出的解决方案
	http://baike.so.com/doc/6838230.html
	http://www.cnblogs.com/chopper/archive/2012/03/24/2403945.html
	
		

http://www.qixing318.com/article/simply-describe-the-difference-between-json-with-json-as-well-as-the-actual-combat.html

	
### 什么是同源策略 以及跨域请求的方案
http://www.cnblogs.com/hustskyking/articles/ten-methods-cross-domain.html
	


