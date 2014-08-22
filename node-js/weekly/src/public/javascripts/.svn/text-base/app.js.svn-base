window.onload = function() {

    var ca = document.getElementById('calendar');
    if(ca){
        ca.addEventListener('change',function(){
            window.location.href = '/day/' + this.value;
        });
    }
	Node.prototype.getElements = function(rule) {
		var nodelist = this.querySelectorAll(rule);
		return Array.prototype.slice.call(nodelist);
	};
	if(document.querySelector('#emailAddress')!==null){
		app.initTags();
		app.emailAddress();
	}
	if (tools.getId('calendar') !== null) {
		app.addPop();
		//添加日志功能
		app.addCtn();
		app.addOutline();
		sessionStorage.setItem('currentIndex',1);
	} else if (tools.getId('aside') !== null) {
		 app.aside();
         if(sessionStorage.getItem('currentIndex')){
            var oUl = tools.getId('aside');
            var oLi = oUl.getElementsByTagName('li');
            oLi[sessionStorage.getItem('currentIndex')].setAttribute('class','visited');
            if(tools.getId('position') !== null){
            	var formObj = tools.getId('user-form');
				ui.selectState(formObj);
            }
         }
	}else{
		sessionStorage.setItem('currentIndex',1);
	}
    //3000ms after hidden tip message
    setTimeout(function(){
        if(document.querySelector('.tip.info') != null)
            document.querySelector('.tip.info').style.display = 'none';
        if(document.querySelector('.tip.error') != null)
            document.querySelector('.tip.error').style.display = 'none';
    },3000);
};

//工具方法
var tools = {
	getId : function(obj) {
		return document.getElementById(obj);
	},
	addEvent:function(obj,callback){
		if(obj == null) 
			return;
		obj.addEventListener('click',function(){
			callback();
			return false;
		},false);

	}
};

//组件方法
var ui = {
	ajax : function(serverUrl, sendData, callback) {
		var xmlHttpRequest = new XMLHttpRequest();
		if (xmlHttpRequest) {
			var url = serverUrl;
			var data = sendData;
			xmlHttpRequest.open("post", url, true);
			xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlHttpRequest.onreadystatechange = function() {
				if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
					var resObj = JSON.parse(xmlHttpRequest.responseText);
					callback(resObj);
				}
			};
			xmlHttpRequest.send(data);
		}
	},
	get : function(serverUrl,callback) {
		var xmlHttpRequest = new XMLHttpRequest();
		if (xmlHttpRequest) {
			var url = serverUrl;
			xmlHttpRequest.open("get", url, true);
			xmlHttpRequest.onreadystatechange = function() {
				if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
					callback(xmlHttpRequest.responseText);
				}
			};
			xmlHttpRequest.send(null);
		}
	},
	serialize : function(form) {
		var parts = [], field = null, i, len, j, optLen, option, optValue;
		for ( i = 0, len = form.elements.length; i < len; i++) {
			field = form.elements[i];

			switch (field.type) {
				case "select-one":
				case "select-multiple":

					if (field.name.length) {
						for ( j = 0, optLen = field.options.length; j < optLen; j++) {
							option = field.options[j];
							if (option.selected) {
								optValue = "";
								if (option.hasAttribute) {
									optValue = (option.hasAttribute("value") ? option.value : option.text);
								} else {
									optValue = (option.attributes["value"].specified ? option.value : option.text);
								}
								parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
							}
						}
					}
					break;

				case undefined:
				//字段集
				case "file":
				//文件输入
				case "submit":
				//提交按钮
				case "reset":
				//重置按钮
				case "button":
					//自定义按钮
					break;

				case "radio":
				//单选按钮
				case "checkbox":
					//复选框
					if (!field.checked) {
						break;
					}
				/* 执行默认曹旭哦 */
				default:
					//不包含没有名字的表单字段
					if (field.name.length) {
						parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
					}
			}
		}
		return parts.join("&");
	},
	addDatalist:function(resObj){
		var indicators = tools.getId('indicators');  //指标
		var platforms = tools.getId('platforms');   //平台
		var flag = false;
		addOption(indicators,resObj.data.indicator);
		addOption(platforms,resObj.data.platform);
		function addOption(domObj,resData){
			for(var i=0;i<domObj.options.length;i++){
				if(domObj.options[i].value == resData){
					flag = true;
					break;
				}
			}
			if(!flag){
				var option = document.createElement('option');
				option.value = resData;
				domObj.appendChild(option);
			}
			if(flag){
				flag = false;
			}
		}
	},
	selectState:function(parentObj){
		var selectObj = parentObj.querySelectorAll('select');
		for(var i = 0; i<selectObj.length; i++){
            var v = selectObj[i].getAttribute('value');
			selectObj[i].querySelector('option[value="'+v+'"]').setAttribute('selected',true);
		}
	}
};

//具体应用方法
var app = {
	//添加日志弹层
	addPop : function() {
		var closeBtn = tools.getId('closeBtn');
		var addContent = tools.getId('add');
		var shade = tools.getId('shade');
		var addBtn = tools.getId('addBtn');
		var addForm = tools.getId('addForm1');
		var errInfo = document.querySelector('.errorInfo');
		tools.addEvent(addBtn,function(){
			shade.style.display = "block";
			addContent.style.display = "block";
			if(errInfo.innerHTML!==""){
				errInfo.innerHTML = "";
			}
		});
		tools.addEvent(closeBtn,function(){
			addContent.style.display = "none";
			shade.style.display = "none";
			addForm.reset();
			return false;
		});
	},
	//添加概述
	addOutline : function() {
		var shade = tools.getId('shade');
		var oBtn = document.querySelector('.outlineBtn');
		var addContentPop = tools.getId('add');
		var addForm = tools.getId('addForm1');
		var addContent = document.querySelector('.addOutline');
		tools.addEvent(oBtn,function(){
			shade.style.display = "block";
			addContent.style.display = "block";
		});
		
		var oModify = document.querySelector('#table');
		var editContent = tools.getId('edit');
		var calendar = tools.getId('calendar');
		var nowDay = new Date().getFullYear() + "-" +(new Date().getMonth()+1>9?new Date().getMonth()+1:"0"+(new Date().getMonth()+1)) + "-" + (new Date().getDate()>9?new Date().getDate():"0"+new Date().getDate());
		var prevDay = new Date(nowDay).getTime()-24*3600*1000;
		if(new Date(calendar.value).getTime()== prevDay){
			oModify.addEventListener('click', function(e) {
				if (e.target.nodeName =="TD" && e.target.nodeName !=="A" && e.target != e.target.parentElement.children[5]) {
	                var tr = e.target.parentElement;
					var url = tr.getAttribute('data-url');
	                tr.className += " edit";
					ui.get(url,modifyContent);
					return false;
				}
			}, true);
		}else{
			return;
		}
		editContent.addEventListener('click', function(e){
			if (e.target.className =="closeBtn") {
				shade.style.display = "none";
				editContent.style.display = "none";
                document.querySelector('#table tr.edit').className = document.querySelector('#table tr.edit').className.replace(/edit/,'');
			}
		}, true);

		tools.addEvent(shade,function(){
			shade.style.display = "none";
			addContent.style.display = "none";
			addContentPop.style.display = "none";
			editContent.style.display = "none";
			addForm.reset();
			if(document.querySelector('#table tr.edit')!==null){
            	document.querySelector('#table tr.edit').className = document.querySelector('#table tr.edit').className.replace(/edit/,'');
			}
		});

		function modifyContent(resObj) {
			var field = document.querySelector('.field');
			field.innerHTML = resObj;
			shade.style.display = "block";
			editContent.style.display = "block";
            ui.selectState(editContent);
			return false;
		}
	},

	//添加日志内容功能
	addCtn : function() {
		var addBtnPop = tools.getId('addBtnPop');
		var addForm = tools.getId('addForm1');
		var table = tools.getId('table');
		addBtnPop.onclick = function() {
			var data = ui.serialize(addForm);
			ui.ajax('/Logs.json', data, addContent);
			return false;
		};
		  function addContent(resObj) {
            var errInfo = document.querySelector('.errorInfo');
            if (resObj.code == 200) {
                var tBody = document.createElement('tbody');
                tBody.innerHTML = render(resObj);
                if(table.children.length == 0){
                    table.appendChild(tBody.childNodes[0]);
                }else{
                    table.insertBefore(tBody.childNodes[0],table.children[0]);
                }
                ui.addDatalist(resObj);
             	errInfo.innerHTML = "";
             	addForm.reset();
            } else if (resObj.code == 500) {
                errInfo.innerHTML = "指标和平台不能为空";
            }
            function render(resObj){
                if (resObj.data.status == 1) {
                  	resObj.data.status= '<td style="color:#00f000">正常</td>';
	            }else{
	                resObj.data.status ='<td style="color:#e00000">异常</td>';
	            }
                return '<tr data-url="/log/'+resObj.data.id+'"><td>'+resObj.data.indicator+'</td><td>'+resObj.data.platform+'</td>'+resObj.data.status+'<td>'+resObj.data.remark+'</td><td>'+resObj.data.method+'</td><td><a href="/logdel/'+resObj.data.id+'" onclick="return confirm(\'你确定要删除吗?\');">删除</a></td></tr>';
            }
		}
	},
	//侧边栏导航
	aside : function() {
		var oUl = tools.getId('aside');
		var oA = oUl.getElementsByTagName('a');
		for (var i = 1; i < oA.length; i++) {
			oA[i].index = i;
			oA[i].addEventListener('click', function() {
				sessionStorage.setItem('currentIndex',this.index);
			}, false);
		}
	},
	//点击删除tag
	initTags : function() {
		var targets = document.getElements("div.target");
		if (targets.length < 1)
			return;
		targets.forEach(function(item) {
			var crosses = item.getElements("li i");
			crosses.forEach(function(item) {
				item.addEventListener("click", function(event) {
					ui.get(event.target.parentNode.getAttribute("data-url"),function(res) {
						var res = JSON.parse(res);
						if (res.code == 200)
							event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
					});
				}, false);
			});
		});
	},
	//邮件抄送人员
	emailAddress:function(){
		var textareaObj = document.querySelector('#emailAddress');
		var errorMsg = document.querySelector('.errorMsg');
		textareaObj.onblur = function(){
			var data = "addrs="+this.value+"&authenticity_token="+document.querySelector('.emailForm input[name="authenticity_token"]').value;
			ui.ajax('/mailcc', data, function(resObj){
				if(resObj.code==500){
					errorMsg.innerHTML = resObj.error;
				}else if(resObj.code ==200){
					errorMsg.innerHTML = "";
				}
			});
		};
	}

};
