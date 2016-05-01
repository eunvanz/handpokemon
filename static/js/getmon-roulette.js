var wantedMon = $('#wantedMon').val();
jQuery(function($) {
	if ($('div.roulette').length != 0) {
		var imageNumber = $("#pickIndex").val();
		var option = {
				speed : 20,
				duration : 5,
				stopImageNumber : imageNumber,
				startCallback : function() {
				},
				slowDownCallback : function() {
					$('.stop').attr('disabled', 'true');
				},
				stopCallback : function($stopElm) {
					$('.stop').css('display', 'none');
					$('.monster-info').css('display', 'block');
					$('div.white-effect').animate({
						opacity : '.8'
					}, 10);
					setTimeout(function() {
						$('div.white-effect').animate({
							opacity : '0'
						}, 1000);
					}, 10);
					if (wantedMon == 'true') {
						alert('지명수배 보상 : 포키머니 +30');
					}
				}
		}
		$('div.roulette').roulette(option).delay(3000).roulette('start');
		
		$('.stop').click(function() {
			$('div.roulette').roulette('stop');
		});
	}
});