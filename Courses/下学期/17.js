事件与事件处理
事件驱动的程序设计模型
事件句柄 一个javascript函数或者是代码片段  在事件发生时调用事件句柄
原始事件模型 DOM0  只能绑定一个事件
  通过html元素的属性设置事件处理代码 （onclick onmouseover onload）
标准事件模型 DOM2  可以任意多个事件句柄

IE事件模型   DOM2

事件类型
  onabort onblur onchange onclick ondbclick onerror onfocus onkeydown onkeyup
  onload onmouseup onreset onsubmit onunload onselect ...
设备事件
  原始事件   输入事件  语义事件
事件句柄的返回值
时间句柄中的this

2级DOM中的高级事件处理
事件的传播
  捕获阶段
  冒泡阶段
    stopPropagation();
    preventDefault();

事件句柄的注册  ///listener  trigger filter
  element.addEventListener(type, function, bubble)
  element.removeEventLister(type, function)
  this 发生事件的元素
Event 对象 
	type
	target
	currentTarget
	tmeStamp
	cancelable

IE
	Event Obj
	ie5+  引入 attachEvent detachEvent   需要携带on  this指的window
	window.event.cancelBubble = true; return false;

鼠标事件
按键事件
自定义事件 bind cancel  trigger fire 
  documen
事件委托
