jQuery(function($) {
	$('#img').ace_file_input({
		style : 'well',
		btn_choose : 'Drop files here or click to choose',
		btn_change : null,
		no_icon : 'ace-icon fa fa-cloud-upload',
		droppable : true,
		thumbnail : 'small'//large | fit
		,
		preview_error : function(filename, error_code) {
		}

	}).on('change', function() {
	});

	var whitelist_ext, whitelist_mime;
	var btn_choose
	var no_icon
	btn_choose = "이미지를 끌어 넣거나 클릭해서 파일을 선택해주세요.";
	no_icon = "ace-icon fa fa-picture-o";

	whitelist_ext = [ "jpeg", "jpg", "png", "gif", "bmp" ];
	whitelist_mime = [ "image/jpg", "image/jpeg", "image/png", "image/gif",
			"image/bmp" ];
	var file_input = $('#img');
	file_input.ace_file_input('update_settings', {
		'btn_choose' : btn_choose,
		'no_icon' : no_icon,
		'allowExt' : whitelist_ext,
		'allowMime' : whitelist_mime
	})
	file_input.ace_file_input('reset_input');

	file_input.off('file.error.ace').on('file.error.ace',
			function(e, info) {
			});
});
