$(document).ready(function() {

	var rotate = function(deg) {
		$("#com").css({
			"-webkit-transform" : "rotate(0deg)"
		});
		$("#com").css({
			"-webkit-transform" : "rotate(" + deg + "deg)"
		});
	};
	window.addeveListener("deviceorientation", function(eve) {
		rotate(eve.alpha);
		$("#txt").text(360 - eve.alpha);
	}, false);

});

