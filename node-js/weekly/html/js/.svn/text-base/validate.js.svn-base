window.addEventListener('load',function(){	
	function getId(obj){
		return document.getElementById(obj);
	}
	var login = getId('login');  //登录
	var reg = getId('reg') // 注册
	var submit = getId('submit'); //改密码
	var errorInfo = getId('errorInfo'); //错误信息
	if( login !==null){
		var account = getId('account');
		var pwd = getId('password');
		login.onclick = function(){
			if(account.value.replace(/^\s+/g,"")===""){
				errorInfo.innerHTML = "请输入用户名";
				return false;
			}else if(pwd.value.replace(/^\s+/g,"")===""){
				errorInfo.innerHTML = "请输入密码";
				return false;
			}
		};
	}else if(reg !==null){
		var username = getId('username');
		var pwd = getId('password');
		var confirmPwd = document.getElementById('repassword');
		reg.onclick = function(){
			if(username.value.replace(/^\s+/g,"")===""){
				errorInfo.innerHTML = "用户名不能为空";
				return false;
			}else if(pwd.value.replace(/^\s+/g,"")===""){
				errorInfo.innerHTML = "密码不能为空";
				return false;
			}else if(pwd.value.replace(/^\s+|\s+$/g,"").length < 6){
				errorInfo.innerHTML = "密码不能小于六位";
				return false;
			}else if(confirmPwd.value.replace(/^\s+/g,"")===""){
				errorInfo.innerHTML = "确认密码不能为空";
				return false;
			}else if(pwd.value.replace(/^\s+|\s+$/g,"")!==confirmPwd.value.replace(/^\s+|\s+$/g,"")){
				errorInfo.innerHTML = "两次新密码不一致";
				return false;
			}
		};
	}else if(submit !== null){
		var oldPwd = getId('old-password');
		var newPwd = getId('new-password');
		var confirmPwd = getId('confirm-password');
		submit.onclick = function(){
			if(oldPwd.value.replace(/^\s+/g,"")==="" || newPwd.value.replace(/^\s+/g,"")===""){
				errorInfo.innerHTML = "密码不能为空";
				return false;
			}else if(newPwd.value.replace(/^\s+|\s+$/g,"").length<6){
				errorInfo.innerHTML = "密码不能小于六位";
				return false;
			}else if(newPwd.value.replace(/^\s+|\s+$/g,"")!==confirmPwd.value.replace(/^\s+|\s+$/g,"")){
				errorInfo.innerHTML = "两次新密码不一致";
				return false;
			}
		};
	}

 },false);





function ajax(serverUrl,sendData){
	var xmlHttpRequest = new XMLHttpRequest();
	if(xmlHttpRequest){
		var url = serverUrl;
		var data = sendData;
		xmlHttpRequest.open("post",url,true);
		xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlHttpRequest.onreadystatechange = function(){
			if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
				var resObj=JSON.parse(xmlHttpRequest.responseText);
				
			}
		}
		xmlHttpRequest.send(data);
	}
}

