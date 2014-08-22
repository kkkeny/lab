(function() {
	var img = new Image();
	img.src = "image/monkey.gif";
	var article = document.getElementById("text");
	var monkey = document.getElementById("ws_load");
	var body = document.querySelector("body");
	var y1, y2;
	//定位猴子
	var w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
	//monkey.style.left = ((w - monkey.offsetWidth) / 2) + "px";
	//monkey.style.top = ((h - monkey.offsetHeight) / 2) + "px";
	//end
	//return;
	function showCover(flag, opacity) {
		var cover = document.getElementById("cover");
		if (flag) {
			//document.body.style.overflowY = article.style.overflowY  = "hidden";
			//article.style.height = document.body.style.height = h + "px";
			body.style.overflow = "hidden";
			cover.style.display = "block";
			cover.style.opacity = opacity;
			body.addEventListener("touchstart", touchstart, false);
			body.addEventListener("touchmove", noScroll, false);
		} else {
			cover.style.opacity = "0";
			window.setTimeout(function() {
				cover.style.display = "none";
				//article.style.height = document.body.style.height = "auto";
				//document.body.style.overflowY = "auto";
				body.style.overflow = "auto";
			}, 1000);
			body.removeEventListener("touchstart", touchstart, false);
			body.removeEventListener("touchmove", noScroll, false);
		}
	}

	function touchstart(event) {
		y1 = event.touches[0].pageY;
	}

	function noScroll(event) {
		y2 = event.touches[0].pageY;
		if (Math.abs(y1 - y2) > 10) {
			event.preventDefault();
			return false;
		}
	}


	T.ajax({
		url : "article.txt?t=" + (new Date().getTime()),
		dataType : 'json',
		timeout : 5000,
		success : function(data, status, xhr) {
			if (data.status === 0) {
				window.setTimeout(function() {
					monkey.style.webkitAnimationPlayState = "paused";
					monkey.style.opacity = "0";
					window.setTimeout(function() {
						monkey.style.visibility = "hidden";
					}, 1000);
					showCover(false);
					article.innerHTML = data.content;
				}, 2000)
			}
		},
		error : function(xhr, errType, err) {
			if (errType === 'timeout')
				alert("获取内容超时，请稍候重新获取！")
			else
				alert("获取失败，请您稍后重试！")
		},
		beforeSend : function() {
			img.addEventListener("load", function() {
				monkey.style.background = "url(" + img.src + ") 0px 0px no-repeat";
				monkey.style.webkitAnimationPlayState = "running";
				monkey.style.visibility = "visible";
				monkey.style.opacity = "1";
			}, false);
			showCover(true, "1");
		},
		complete : function(data) {

		}
	});
	var _toArray = function(nodeList) {
		return Array.prototype.slice.call(nodeList);
	};
	var click = 0;
	var button = document.querySelector("section.menu > p.cross");
	var closeButton = _toArray(document.querySelectorAll("button.w_ok"));
	var stars = _toArray(document.querySelectorAll("section.menu  p:not([class])"));
	var ul = document.querySelector("section.menu > ul");
	var animating = false;
	button.addEventListener("click", function(event) {
		if (animating === true)
			return;
		if (click % 2 === 0) {
			event.target.className = "cross turn";
			event.target.style.opacity = "1";
			ul.className = "";
		} else {
			event.target.className = "cross";
			ul.className = "out";
		}
		stars.forEach(function(item) {
			if (click % 2 === 0)
				item.style.webkitAnimationName = "flyout";
			else
				item.style.webkitAnimationName = "flyin";
		});
		click++;
		//event.stopPropagation();
		animating = true;
	}, false);
	button.addEventListener("webkitTransitionEnd", function(event) {
		if (event.target.className == "cross")
			event.target.style.opacity = "0.4";
		animating = false;
	}, false);
	function showDailog(index, flag) {
		var win = document.querySelector("section#w_" + index);
		if (!win)
			return;
		win.className = flag ? "window show" : "window hidden";
	}

	//飞出菜单事件
	stars.forEach(function(item, index) {
		if (index > 1)
			item.addEventListener("click", function() {
				showDailog(index, true);
				showCover(true, "0.6");
			}, false);
	});
	//关闭按钮
	closeButton.forEach(function(item) {
		item.addEventListener("click", function() {
			var window = item.parentNode;
			if (window.className == "window show") {
				window.className = "window hidden";
				showCover(false);
			}
		}, false);
	});
	//调节选项
	//字号
	document.getElementById("r_fontsize").addEventListener("change", function(event) {
		var fz = event.target.value + "px";
		console.log(fz)
		article.style.fontSize = fz;
	}, false);
	//行高
	document.getElementById("r_lingheight").addEventListener("change", function(event) {
		var lh = event.target.value + "px";
		article.style.lineHeight = lh;
	}, false);
	//边距
	document.getElementById("r_padding").addEventListener("change", function(event) {
		var pd = event.target.value + "%";
		article.style.width = (100 - (parseInt(pd) * 2)) + "%";
		article.style.padding = pd + " " + pd;
	}, false);
	//背景色
	document.getElementById("r_bg").addEventListener("change", function(event) {
		var bg = event.target.value;
		article.style.backgroundColor = bg;
	}, false);
})();
