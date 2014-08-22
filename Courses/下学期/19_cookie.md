#19 cookie 

document.cookie 对象
服务端与客户端都可以进行读写

cookie 属性 用来控制生存期 可见性 安全性
	expires
	max-age
	path
	domain
	secure

检查可用性navigator.cookieEnabled


document.cookie = "version=" + encodeURIComponent(document.lastModified);

escapse unescpage 废弃
expires 废弃

cookie 数据不能超过4k 总数不超过300个

cookie 替代方法   早期 ie 和falsh插件  h5 sessionStorage localStorage 

cookie 读写

	function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure){
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		
		if(oExpires){
			sCookie += "; expires=" + oExpires.toGMTString();
		}
		if(sPath){
			sCookie += "; path=" + sPath;
		}
		if(sDomain){
			sCookie += "; domain=" + sDomain;
		}
		if(bSecure){
			sCookie += "; secure"
		}
		document.cookie = sCookie;
	}
	
	function getCookie(sName){
		var oRE = new RegExp("(?:; )?" + sName + "=([^;]*);?");
		if(oRE.test(document.cookie)){
			return decodeURIComponent(RegExp["$1"])
		}else{
			return null;
		}
	}