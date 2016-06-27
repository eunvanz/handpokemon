jQuery(function($) {
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
});
