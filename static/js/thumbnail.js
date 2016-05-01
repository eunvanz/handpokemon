jQuery(function($) {

	if ($('img.user-photo') != null) {
		$('img.user-photo').each(function() {
			if ($(this).width() < $(this).height()) {
				$(this).width('40');
			} else if ($(this).width() > $(this).height()) {
				$(this).height('40');
			}
		});
	}

	if ($('img.user-photo-ranking') != null) {
		$('img.user-photo-ranking').each(function() {
			if ($(document).width() < 767) {
				if ($(this).width() < $(this).height()) {
					$(this).width('40');
				} else if ($(this).width() > $(this).height()) {
					$(this).height('40');
				}
			} else {
				if ($(this).width() < $(this).height()) {
					$(this).width('80');
				} else if ($(this).width() > $(this).height()) {
					$(this).height('80');
				}
			}
		});
	}

	// 이미지 썸네일 처리
	if ($('.focuspoint') != null) {
		$('.focuspoint').each(
				function() {
					$(this).focusPoint();
					$(this).attr('data-image-w',
							$(this).children('.user-photo').width());
					$(this).attr('data-image-h',
							$(this).children('.user-photo').height());
				})
	}

	// ///////////////////////////////////
	$(document).one('ajaxloadstart.page', function(e) {
		$tooltip.remove();
	});

	var d1 = [];
	for (var i = 0; i < Math.PI * 2; i += 0.5) {
		d1.push([ i, Math.sin(i) ]);
	}

	var d2 = [];
	for (var i = 0; i < Math.PI * 2; i += 0.5) {
		d2.push([ i, Math.cos(i) ]);
	}

	var d3 = [];
	for (var i = 0; i < Math.PI * 2; i += 0.2) {
		d3.push([ i, Math.tan(i) ]);
	}

	$('.dialogs,.comments').ace_scroll({
		size : 300
	});

})