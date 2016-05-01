/**
 * 채집 공통 JS 파일
 */

function setGetMonBtn(element) {
	element.click(function() {
		$($(this).parent()).submit();
		element.attr('disabled', 'disabled');
		setTimeout(function() {
			element.removeAttr('disabled');
		}, 10000);
	});
}