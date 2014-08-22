* style属性可以设置行内样式，覆盖原有内容，但是不能读取样式数据
* css中不能用连字符“-” 会被解析为减号,改为大写 （float是保留字， 如果要设置浮动用cssFloat）
* 设置数值属性的样式都需要携带单位（e.style.width = '300px'）;
* window.getComputedStyle(element, null||伪元素)
  IE: ele.currentStyle
* className
  var CSSClass = {};
  CSSClass.is = function(e, c){
    if (typeof "string" == e){
      e = document.getElementById(e);
    };

    var classes = e.className;
    if (!classes) return false;
    if (Classes == c) return true;

    return e.className.search("\\b" + c + "\\b") !=-1;
  }

  CSSClass.add = function(e, c){
    if (typeof "string" == e) e = document.getElementById(e);
    if (CSSClass.is(e, c)) return;
    if (e.className)  c = ""  + c;
    e.className = +c;
   }

  CSSClass.remove = function(){
    e.className.replace(new RegExp('\\b' +c+ '\\b\\s', 'g'), "");
  }

* 样式脚本标签 link script 的激活与关闭   disabled  =  true || false;
