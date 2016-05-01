jQuery(function($) {
	var opts = {
			 lines: 12 // The number of lines to draw
			 , length: 7 // The length of each line
			 , width: 4 // The line thickness
			 , radius: 10 // The radius of the inner circle
			 , scale: 0.25 // Scales overall size of the spinner
			 , corners: 1 // Corner roundness (0..1)
			 , color: '#000' // #rgb or #rrggbb or array of colors
			 , opacity: 0.25 // Opacity of the lines
			 , rotate: 0 // The rotation offset
			 , direction: 1 // 1: clockwise, -1: counterclockwise
			 , speed: 2 // Rounds per second
			 , trail: 60 // Afterglow percentage
			 , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			 , zIndex: 2e9 // The z-index (defaults to 2000000000)
			 , className: 'spinner' // The CSS class to assign to the spinner
			 , top: '50%' // Top position relative to parent
			 , left: '50%' // Left position relative to parent
			 , shadow: false // Whether to render a shadow
			 , hwaccel: false // Whether to use hardware acceleration
			 , position: 'absolute' // Element positioning
	}
	var target = $('.main-content-inner');
	var height = $(window).height();
	var width = target.width();
	var left = target.position().left;
	$('#loading-div').css('position', 'absolute').css('top', 0).css('left', left)
	.css('height', height).css('width', width).css('z-index', '9999').addClass('loading-div').css('display', 'none');
	$('body').append($('#loading-div'));
	var spinner = new Spinner(opts).spin(document.getElementById('loading-div'));
	
	$(window).bind('beforeunload', function() {
		showLoading();
	});
	
	$('#loading-div').on('click', function() {
		hideLoading();
	});
	
});

function showLoading() {
	$('#loading-div').css('top', $(window).scrollTop()).css('display', 'block');
}

function hideLoading() {
	$('#loading-div').css('display', 'none');
}