jQuery(function($) {
  var imageNumber = $('#pickIndex').val();
  var option = {
		speed : 10,
		duration : 5,
		stopImageNumber : imageNumber,
		startCallback : function() {
		},
		slowDownCallback : function() {
			$('.stop').attr('disabled', 'true');
		},
		stopCallback : function($stopElm) {
			$('.stop').css('display', 'none');
			$('.start-btn').css('display', 'block');
			$('div.white-effect').animate({
				opacity : '.8'
			}, 10);
			setTimeout(function() {
				$('div.white-effect').animate({
					opacity : '0'
				}, 1000);
			}, 10);
    }
  };
  $('div.first-attack-roulette').roulette(option).delay(3000).roulette('start');

	$('.stop').click(function() {
		$('div.first-attack-roulette').roulette('stop');
	});
});
