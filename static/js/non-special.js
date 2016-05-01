$('.non-special').keyup(function() {
	var value = $(this).val();
	var arr_char = new Array();

	arr_char.push("'");
	arr_char.push("\"");
	arr_char.push("<");
	arr_char.push(">");
	arr_char.push("/");

	for (var i = 0; i < arr_char.length; i++) {
		if (value.indexOf(arr_char[i]) != -1) {
			window.alert("<, >, ', \", / 특수문자는 사용하실 수 없습니다.");
			value = value.substr(0, value.indexOf(arr_char[i]));
			
			$(this).val(value);
		}
	}
});

$('textarea').keyup(function() {
	var value = $(this).html();
	var arr_char = new Array();

	arr_char.push("'");
	arr_char.push("\"");
	arr_char.push("<");
	arr_char.push(">");
	arr_char.push("#");

	for (var i = 0; i < arr_char.length; i++) {
		if (value.indexOf(arr_char[i]) != -1) {
			window.alert("<, >, ', \", # 특수문자는 사용하실 수 없습니다.");
			value = value.substr(0, value.indexOf(arr_char[i]));
			
			$(this).val(value);
		}
	}
});