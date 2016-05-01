var nickname = $('#userNickname').val();
var recentImg = $('#recentImg').val();
var email = $('#userEmail').val();

function flip() {
	$(".front").toggle();
	$(".back").toggle();
};

function changeImg(monId) {
	showLoading();
	
	$.ajax({
		url : "main.do?action=changeMonImg&email=" + email + "&monId=" + monId + "&imgId=" + $('#mon-img-' + monId).val(),
		contentType : "application/json;charset=utf-8",
		dataType : "json",
		type : "post",
		error:function(xsr,status,message){
			console.log("status :"+status+" error :"+message);
		},
		success : alterImg
	});
	
	function alterImg(data) {
		hideLoading();
		$('.monster-image-' + monId).attr("src", "assets/images/monsters/" + data.img);
		$('#designer-mon-' + monId).html(data.designer);
		$('.mon-col-' + monId).attr("data-designer", data.designer);
	}
	
}

jQuery(function($) {
	showLoading();

	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		// if($(e.target).attr('href') == "#home") doSomethingNow();
	})

	$('.tab-pane').each(function() {
		if ($(this).attr('id') != 'have') {
			$(this).removeClass('in').removeClass('active');
		}
	});

	var oldie = /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase());
	$('.easy-pie-chart.percentage').each(function() {
		$(this).easyPieChart({
			barColor : $(this).data('color'),
			trackColor : '#EEEEEE',
			scaleColor : false,
			lineCap : 'butt',
			lineWidth : 8,
			animate : oldie ? false : 1000,
			size : 75
		}).css('color', $(this).data('color'));
	});
	if ($('.function-section').position() != null) {
		var fsPosition = $('.function-section').position().top;
		$(window).scroll(function() {
			var scrollHeight = $(window).scrollTop();
			if (scrollHeight >= fsPosition) {
				$('.function-bar').css('top', function() {
					return $(window).scrollTop() - fsPosition;
				});
			} else {
				$('.function-bar').css('top', '0px');
			}
		});
	}
	var loaded = false;
	var nickname = $('#userNickname').val();
	var userNickname = escape(encodeURIComponent(nickname));
	/*$(window).scroll(function() {
		scrollHeight = $(window).scrollTop();
		if ($('.function-section').position() != null) {
			var fsPosition = $('.function-section').position().top;
			if (scrollHeight >= fsPosition) {
				$('.function-bar').css('top', function() {
					return $(window).scrollTop() - fsPosition;
				});
			} else {
				$('.function-bar').css('top', '0px');
			}
		}
		if (!loaded) {
			showLoading();
			loaded = true;
			$.ajax({
				url : "main.do?action=loadCollection&userForCollection=" + userNickname,
				contentType : "application/json;charset=utf-8",
				dataType : "html",
				type : "get",
				error:function(xsr,status,message){
					console.log("status :"+status+" error :"+message);
				},
				success : loadCollection
			});
			function loadCollection(html) {
				hideLoading();
				$('.collection-container').append(html);
			}
		}
	});*/
	$.ajax({
		url : "main.do?action=loadCollection&userForCollection=" + userNickname,
		contentType : "application/json;charset=utf-8",
		dataType : "html",
		type : "get",
		error:function(xsr,status,message){
			console.log("status :"+status+" error :"+message);
		},
		success : loadCollection
	});
	function loadCollection(html) {
		hideLoading();
		$('.collection-container').append(html);
	}
});