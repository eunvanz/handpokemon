$('#demo2').wScratchPad({
		size : 25,
		bg : 'img/monsters/' + $('#monImg').val(),
		fg : 'img/common/scratch-to-win.png',
		'cursor' : 'url("img/common/Question-Coin-icon.png") 5 5, default',
		scratchMove : function(e, percent) {
			if (percent > 68) {
				this.clear();
				$('.monster-info').css('display', 'block');
				$('div.white-effect').animate({
					opacity : '.8'
				}, 10);
				setTimeout(function() {
					$('div.white-effect').animate({
						opacity : '0'
					}, 1000);
				}, 10);
			}
		}
	});
