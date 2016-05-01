jQuery(function($) {
	$('#ev-btn').on('click', function() {
		$('.ev-btn').attr('disabled', 'disabled');
		$('.get-mon-btn').attr('disabled', 'disabled');
		$('#evForm').submit();
		setTimeout(function() {
			$('.ev-btn').removeAttr('disabled');
		$('.get-mon-btn').removeAttr('disabled');
		}, 10000)
	});
});