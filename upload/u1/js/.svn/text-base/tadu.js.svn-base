(function(window){
	var document = window.document;

	
	//prototype
	var slice = Array.prototype.slice,
		forEach = Array.prototype.forEach,
		every = Array.prototype.every,
		indexOf = Array.prototype.indexOf,
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty;
	//regexp
	var rclass = /[\n\t]/g,
		rspace = /\s+/,
        rreturn = /\r/g;

    var readyList = [];

	//package
	var tadu = function(selector, context){
		return new tadu.fn.init(selector, context);
	};

	//extend
	tadu.fn = tadu.prototype = {
		constructor: tadu,
		init: function(selector,context){
			
			// T('') T(null) T(undifined)
			if(!selector) return this;

			// Handle $(DOMElement)
			if(selector.nodeType){
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}

			// body
			if( selector === 'body' && !context){
				this.context = document;
				this[0] = document.body;
				this.selector = 'body';
				this.length = 1;
				return this;
			}

			if(typeof selector  === 'string'){
				if(selector){
					//document.getElementsByName  getElementsByTagName getElementsByTagNameNS
					//document.querySelector  document.querySelectorAll
					//if selector is .class document.getElementsByClassName
					//if selector is #id
					var nodelist ;
					this.selector = selector;
					if(context && context.nodeType){
						this.context = context;
						nodelist = context.querySelectorAll(selector);
					}else{
						this.context = document;
						nodelist = document.querySelectorAll(selector);
					}
					
					if(toString.call(nodelist) === "[object NodeList]"){
						if(nodelist.length <= 1){
							this[0] = nodelist[0];
							this.length = 1;
							return this;	
						}else{
							//for
							for(var i = 0; i < nodelist.length; i++){
								this[i] = nodelist[i];
								this.length = nodelist.length;
							}
							return this;
						}
					}
				}
			}else if(tadu.isFunction(selector)){
				return tadu(document).ready(selector);
			}
			return this;
		},
		access:function(elems, prop, value){
			var length = elems.length;
			if(typeof prop === 'object'){
				for(var key in prop){
					access(elems, key, prop[key], fn)
				}
				return elems;
			}
			if(value !== undefined){
				for(var i = 0; i < length; i++){
					//
					elems[i].setAttribute(prop, value)
					/*
					if (elems[i].nodeType === 1) {
                    	this.removeAttribute(prop);
                    }
                    */
				}
				return elems;
			}else{
				return elems[0].getAttribute(prop)
			}

		},
		css: function(property, value){
			var cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 };
			function camelize(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
			function dasherize(str) {
			    return str.replace(/::/g, '/')
			       .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
		           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
		           .replace(/_/g, '-')
		           .toLowerCase()
			 }
			function maybeAddPx(name, value) {
    			return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  			}
			
			//object  or  key-value
			if (arguments.length < 2 && typeof property == 'string')
	       		return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

	      	var css = ''
	      	for (key in property)
	        	if (!property[key] && property[key] !== 0)
	          		this.each(function(){ this.style.removeProperty(dasherize(key)) })
	        	else
	          		css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'

	      	if (typeof property == 'string')
	        	if (!value && value !== 0)
	          		this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        	else
	          		css = dasherize(property) + ":" + maybeAddPx(property, value)

	    	return this.each(function(){ 
	    		if(this.style)
	       			this.style.cssText += ';' + css 
	   		})
		},
		attr: function(prop, value){
			//get prop or set prop
			return this.access(this,prop,value);
		},
		removeAttr:function(name){
			return this.access(this, name, "" );
		},
		addClass: function(value){
			if ( value && typeof value === "string" ) {
            	var classNames = (value || "").split( rspace );

                for ( var i = 0, l = this.length; i < l; i++ ) {
                    var elem = this[i];

                    if ( elem.nodeType === 1 ) {
                        if ( !elem.className ) {
                            elem.className = value;

                        } else {
                            var className = " " + elem.className + " ", setClass = elem.className;
                            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                                if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                                    setClass += " " + classNames[c];
                                }
                            }
                            elem.className = tadu.trim( setClass );
                    	}
                	}
                }
            }
 
            return this;		
		},
		removeClass: function(value){
			if ( (value && typeof value === "string") || value === undefined ) {
                var classNames = (value || "").split(rspace);
 
                for ( var i = 0, l = this.length; i < l; i++ ) {
                    var elem = this[i];
 
                    if ( elem.nodeType === 1 && elem.className ) {
		                if ( value ) {
                            var className = (" " + elem.className + " ").replace(rclass, " ");
                            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
	                        elem.className = tadu.trim( className );
 
                        } else {
                            elem.className = "";
                        }
                    }
                }
            }
 
            return this;
		},
		toggleClass: function(name){
			if(this.hasClass(name))
				this.removeClass(name);
			else
				this.addClass(name);

			return this;
		},
		hasClass: function(selector){
			var className = " " + selector + " ";
            for ( var i = 0, l = this.length; i < l; i++ ) {
                if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
                    return true;
                }
            }
 
            return false;
		},
		each: function(callback, args){
			every.call(this,function(obj,index,arr){
				if(typeof obj.nodeType !== undefined && obj.nodeType === 1 && tadu.isFunction(callback)){					
					callback.call(obj, obj, index);
				}
				return true;
			})			
			return this;
		},
		size: function(){
			return this.length;
		},
		toArray: function(){
			return slice.call(this,0);
		},
		get:function(num){
			return num === null ? this.toArray() : (num < 0 ? this[0] : this[num]);
		},
		ready:function(fn){
			tadu.bindReady();
			if(tadu.isReady){
				fn.call(document, tadu);
			}else if(readyList){
				readyList.push(fn);
			}
			return this;
		},
		show:function(){
			return this.css('display','block');			
		},
		hide:function(){
			return this.css('display','none');
		},		
    	append:function(html){    		
    		return this.each(function(ele){    			
    			var dom  = tadu.fragment(html)    			
				for(var i =0;i<dom.length;i++){    			
					ele.appendChild(dom[i])
				}	    			
    		})
    	},
    	remove:function(){
    		 return this.each(function(){
		        if (this.parentNode != null)
		          this.parentNode.removeChild(this)
		      })
    	},
		//set element html  next @TODOS get element html from index
		html:function(html){
			return html === undefined ?
        		(this.length > 0 ? this[0].innerHTML : null) :
        		this.each(function(ele){        		  	
        		  	ele.innerHTML = html;
        		})
		}
	};
	//共享对象
	tadu.fn.init.prototype = tadu.fn;

	function isPlainObject(obj){
		return obj !== null && obj == obj.window && toString.call(obj) === "[object Object]" && obj.__proto__ == Object.prototype;
	}
	function extend(target, source, deep){
		for(var key in source){
			if(deep && isPlainObject(source[key])){
				if(!isPlainObject(target[key])) target[key] = {};
				extend(target[key], source[key], deep)
			}else if(source[key] !== undefined) target[key] = source[key]
		}
	}
	//mixin 混合
	tadu.mixin = tadu.fn.mixin = function(target){
		var deep, args = slice.call(arguments);
		if(typeof target == 'boolean'){
			deep = target;
			target = args.shift();
		}
		args.forEach(function(arg){ extend(target, arg, deep)})
		return target;
	}

	tadu.mixin(tadu,{
		isReady:false,
		ready:function(){
			if(!tadu.isReady){
				if( !document.body){
					return setTimeout(tadu.ready,13)
				}
				tadu.isReady = true;

				if(readyList){
					var fn ,i = 0;
					while( fn = readyList[i++]){
						fn.call(document, tadu)
					}
					readyList = null
				}

				if(tadu.fn.triggerHandler){
					tadu(document).triggerHandler('ready');
				}
			}
		},
		bindReady:function(){
			if(document.readyState === "complete"){
				return tadu.ready();
			}

			if(document.addEventListener){
				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", DOMContentLoaded, false)

				window.addEventListener('load', tadu.ready, false);
			}//else process ie attachEvent  onreadystatechange  DOMContentLoaded

		},
		grep:function(elems, callback){
			var ret = [];
			for(var i = 0; i < elems.length; i++){
				if(callback.call(elems[i],i) === true)
					ret.push(elems[i])
			}
			return ret;
		},
		merge:function(first, second){
			for(var i = 0;i < second.length; i++){
				first.push(second[i])
			}
			return first;
		},
		inArray:function(ele, arr){
			return arr.indexOf(ele);
		},
		isObject:function(obj){
			return toString.call(obj) === "[object Object]";
		},
		isArray:function(arr){
			return toString.call(arr) === "[object Array]";
		},
		isFunction:function(fn){
			return toString.call(fn) === "[object Function]";
		},
		isPlainObject:isPlainObject,
		isEmptyObject:function(obj){
			for(var key in obj){
				return false
			}
			return true;
		},
		inWindow:function(obj){
			return (obj in window)
		},
		parseJSON:function(obj){					
			if(obj !=null && typeof obj !== "string") return;			
			if("JSON" in window){				
				return JSON.parse(obj)
			}else{
				return new Function("return"+obj)()
			}
		},
		each:function(obj, callback){	
			if(tadu.isObject(obj)){
				for(var key in obj){
					//如果callback 返回false 取消循环
					if(tadu.isFunction(callback)&&callback.call(obj[key], key , obj) ===false){
						break;
					}
				}
			}else if(tadu.isArray(obj)){
				for(var i = 0;i < obj.length; i++){
					if(tadu.isFunction(callback)&&callback.call(obj[i], i, obj) === false){
						break;
					}
				}
			}
		},
		map:function(){},
		trim:function(text){
			return (text || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
		},
		//copy
		fragment:function(html, name ,properties){
			var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    		tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
    		var table = document.createElement('table'),
    			tableRow = document.createElement('tr'),
    			containers = {
		      'tr': document.createElement('tbody'),
		      'tbody': table, 'thead': table, 'tfoot': table,
		      'td': tableRow, 'th': tableRow,
		      '*': document.createElement('div')
		    };

			if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
		    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
		    if (!(name in containers)) name = '*'


		    var nodes, dom, container = containers[name]
		    container.innerHTML = '' + html
		    
		    return container.childNodes;
		}
	})


	if ( document.addEventListener ) {
        DOMContentLoaded = function() {
            document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            tadu.ready();
        };
	}
	window.T = window.tadu = tadu;
})(this);

//ajax
(function(tadu){
	var empty = function(){};
	tadu.ajaxSettings = {
		type: "GET",
		beforeSend: empty,
		success: empty,
		error: empty,
		complete: empty,
		global: true,
		xhr: function(){
			return new window.XMLHttpRequest();
		},
		accepts:{
			script: 'text/javascript,application/javascript',
			json: 'application/json',
			xml: 'application/xml,text/xml',
			html: 'text/html',
			text: 'text/plain'
		},
		timeout : 0,
		//processData  whether data should be serailized to string
	}
	tadu.mixin(tadu,{
		abort:function(){
			return true;
		},
		ajax: function(options){
			var settings = tadu.mixin({}, tadu.ajaxSettings, options)


			if(!settings.url) settings.url = window.location.toString()
			//serializeData(settings);

			var dataType = settings.dataType,
				mime = settings.accepts[dataType],
				baseHeaders = {},
				protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
				xhr = settings.xhr(),
				abortTimeout;

			//如果请求没有参数  返回ajax对象
			if(typeof options === "undefined") return xhr;


			if(mime){
				baseHeaders['Accpet'] = mime;
				if(mime.indexOf(",")>-1) mime = mime.split(',',2)[0]
				xhr.overrideMimeType && xhr.overrideMimeType(mime)
			}

			var ajaxError = function(error, type, xhr, settings){
				var context = settings.context;
				settings.error.call(context, xhr, type, error);
				ajaxComplete(type, xhr, settings)
			};
			var ajaxSuccess = function(data, xhr, settings){
				var context = settings.context;
				settings.success.call(context, data, xhr, settings);
				ajaxComplete("success", xhr, settings)
			};
			var ajaxComplete = function(status, xhr, settings){
				var context = settings.context;
				settings.complete.call(context, xhr, status);
			}


			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					xhr.onreadystatechange = empty;
					clearTimeout(abortTimeout);

					var result, error = false;
					if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ){
						result = xhr.responseText;

						try{				
							//
							if(dataType == 'script') (1,eval)(result)
							else if(dataType == 'xml') result = xhr.responseXML
							else if(dataType == 'json') result = tadu.parseJSON(result);
						} catch(e){							
							error = e
						}

						
						if(error) ajaxError(error, 'parsererror', xhr, settings)
						else ajaxSuccess(result, xhr, settings)
					}else{
						ajaxError(null, xhr.status ? 'error' : 'abort', xhr, settings)
					}
				}
			}
			//async
			var async = 'async' in settings ? settings.async : true;
			xhr.open(settings.type, settings.url, async);

			//header
			for( name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

			//before send process
			if(settings.beforeSend.call(settings.context, xhr, settings) === false){
				xhr.abort();
				return false;
			}				
			//timeout
			if(settings.timeout > 0 ) abortTimeout = setTimeout(function(){
				xhr.onreadystatechange = empty;
				xhr.abort();
				ajaxError(null, 'timeout', xhr, settings)
			},settings.timeout)

			//send
			xhr.send(settings.data ? settings.data : null)
			return xhr
		}
		

	})
})(tadu);

//event
(function(tadu){
	function add(element, event, fn){
		element.addEventListener(event, fn, false);
	}
	function remove(element, event, fn){
		element.removeEventListener(event, fn, false);
	}	
	tadu.mixin(tadu.fn,{
		bind:function(event, callback){			
			return this.each(function(){
				if(this.nodeType ===1)
					add(this, event, callback)
			})		
		},
		unbind:function(event, callback){
			return this.each(function(){
				if(this.nodeType ===1)
					remove(this, event, callback)
			})
		}
	})
})(tadu);