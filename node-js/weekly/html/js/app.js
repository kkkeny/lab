window.onload = function(){
    if(tools.getId('control_date')!==null){
        app.addPop();// //添加日志功能
        app.addCtn();
        app.addOutline();
    }else if(tools.getId('aside')!==null){
         app.aside();
    }
}

//工具方法
var tools = {
    getId:function(obj){
        return document.getElementById(obj);
    }
};

//组件方法
var ui = {
    ajax:function(serverUrl,sendData,callback){
        var xmlHttpRequest = new XMLHttpRequest();
        if(xmlHttpRequest){
            var url = serverUrl;
            var data = sendData;
            xmlHttpRequest.open("post",url,true);
            xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttpRequest.onreadystatechange = function(){
                if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
                    var resObj=JSON.parse(xmlHttpRequest.responseText);
                    callback(resObj)
                    
                }
            }
            xmlHttpRequest.send(data);
        }
    },
    serialize:function(form) {
        var parts = [],
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue;
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];

            switch (field.type) {
            case "select-one":
            case "select-multiple":

                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
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
    }
};

//具体应用方法
var app = {
    //添加日志弹层
    addPop:function(){
        var closeBtn = tools.getId('closeBtn');
        var addContent = tools.getId('add');
        var shade = tools.getId('shade');
        var addBtn = tools.getId('addBtn');
        var calendar = tools.getId('control_date');
        var nowDate = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
        calendar.value = nowDate;
        addBtn.onclick = function(){
            shade.style.display = "block";
            addContent.style.display = "block";
        }
        closeBtn.onclick = function(){
            addContent.style.display = "none";
            shade.style.display = "none";
            return false;
        }
        // shade.onclick = function(){
        //     shade.style.display = "none";
        //     addContent.style.display = "none";
        //     return false;
        // }
    },
    addOutline:function(){
        // var shade = tools.getId('shade');
        var shade = document.querySelector('.shade');
        var oBtn = document.querySelector('.outlineBtn');
        var addContent = document.querySelector('.addOutline');
        var finish = document.querySelector('.finish');
        oBtn.onclick = function(){
            shade.style.display = "block";
            addContent.style.display = "block";
        }
        shade.onclick = function(){
            shade.style.display = "none";
            addContent.style.display = "none";
        }

        var oModify = document.querySelector('.modify');
        oModify.onclick = function(){
            var url = oModify.getAttribute('data')
            ui.ajax(url,"",modifyContent);
            return false;
        };

        function modifyContent(resObj){
            var field = document.querySelector('.field');
            field.innerHTML=resObj;
            shade.style.display = "block";
            addContent.style.display = "block";
             return false;
        }
    },

    //添加日志内容功能
    addCtn:function(){
        var addBtnPop = tools.getId('addBtnPop');
        var addForm = tools.getId('addForm');
        addBtnPop.onclick = function(){
            var data = ui.serialize(addForm)
            ui.ajax('/Logs.json',data,addContent);
            return false;
        };
        function addContent(resObj){
            var trAfter = tools.getId('trContent');
            if(resObj.code==200){
                var otr = document.createElement('tr');
                otr.innerHTML=trAfter.innerHTML;
                var otd = otr.getElementsByTagName('td');
                otd[0].innerHTML = resObj.indicator;
                otd[1].innerHTML = resObj.platform;
                otd[2].innerHTML = resObj.status;
                otd[3].innerHTML = resObj.remark;
                otd[4].innerHTML = resObj.method;
            }
        }

    },

    //侧边栏导航
    aside:function(){
        var oUl = tools.getId('aside');
        var oLi = oUl.getElementsByTagName('li');
        for(var i=1; i<oLi.length;i++){
            oLi[i].addEventListener('click',function(){
                for(var j=1;j<oLi.length;j++){
                    if(oLi[j].className = "visited"){
                        oLi[j].className = "";
                    }
                }
                this.className = "visited";
            },false);
        }
    }


};


