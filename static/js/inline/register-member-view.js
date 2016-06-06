jQuery(function($) {

  $('#register-member-view #pick-btn')
    .click(function() {
      $('#post-pick').toggle();
      $('#pre-pick').toggle();
    });

  $("#register-member-view .flip-btn").click(function() {
    $(".front").toggle();
    $(".back").toggle();
  });

  $('#register-member-view #id-input-file-3').ace_file_input({
    no_file:'프로필 이미지가 없습니다.',
    btn_choose:'이미지선택',
    btn_change:'이미지교체',
    droppable:false,
    onchange:null,
    thumbnail:true, //| true | large
    whitelist:'gif|png|jpg|jpeg'
    //blacklist:'exe|php'
    //onchange:''
    //
  });

  $('#register-member-view #tmp').ace_file_input({
    style : 'well',
    btn_choose : 'Drop files here or click to choose',
    btn_change : null,
    no_icon : 'ace-icon fa fa-cloud-upload',
    droppable : true,
    thumbnail : 'small'//large | fit
    //,icon_remove:null//set null, to hide remove/reset button
    /**,before_change:function(files, dropped) {
      //Check an example below
      //or examples/file-upload.html
      return true;
    }*/
    /**,before_remove : function() {
      return true;
    }*/
    ,
    preview_error : function(filename, error_code) {
      //name of the file that failed
      //error_code values
      //1 = 'FILE_LOAD_FAILED',
      //2 = 'IMAGE_LOAD_FAILED',
      //3 = 'THUMBNAIL_FAILED'
      //alert(error_code);
    }

  }).on('change', function() {
    //console.log($(this).data('ace_input_files'));
    //console.log($(this).data('ace_input_method'));
  });

  //$('#id-input-file-3')
  //.ace_file_input('show_file_list', [
  //{type: 'image', name: 'name of image', path: 'http://path/to/image/for/preview'},
  //{type: 'file', name: 'hello.txt'}
  //]);

  //dynamically change allowed formats by changing allowExt && allowMime function
  var whitelist_ext, whitelist_mime;
  var btn_choose
  var no_icon
  btn_choose = "이미지를 끌어 넣거나 클릭해서 파일을 선택해주세요.";
  no_icon = "ace-icon fa fa-picture-o";

  whitelist_ext = [ "jpeg", "jpg", "png", "gif", "bmp" ];
  whitelist_mime = [ "image/jpg", "image/jpeg", "image/png", "image/gif",
      "image/bmp" ];
  var file_input = $('#tmp');
  file_input.ace_file_input('update_settings', {
    'btn_choose' : btn_choose,
    'no_icon' : no_icon,
    'allowExt' : whitelist_ext,
    'allowMime' : whitelist_mime
  })
  file_input.ace_file_input('reset_input');

  file_input.off('file.error.ace').on('file.error.ace',
      function(e, info) {
        //console.log(info.file_count);//number of selected files
        //console.log(info.invalid_count);//number of invalid files
        //console.log(info.error_list);//a list of errors in the following format

        //info.error_count['ext']
        //info.error_count['mime']
        //info.error_count['size']

        //info.error_list['ext']  = [list of file names with invalid extension]
        //info.error_list['mime'] = [list of file names with invalid mimetype]
        //info.error_list['size'] = [list of file names with invalid size]

        /**
        if( !info.dropped ) {
          //perhapse reset file field if files have been selected, and there are invalid files among them
          //when files are dropped, only valid files will be added to our file array
          e.preventDefault();//it will rest input
        }
         */

        //if files have been selected (not dropped), you can choose to reset input
        //because browser keeps all selected files anyway and this cannot be changed
        //we can only reset file field to become empty again
        //on any case you still should check files with your server side script
        //because any arbitrary file can be uploaded by user and it's not safe to rely on browser-side measures
      });

  var $validation = true;
  var submitMode = false;
  // $('#register-member-view #submit-btn').click(function() {
  //   $('#register-member-view #validation-form').submit();
  // });

  $('#register-member-view #fuelux-wizard-container').wizard({
  //step: 2 //optional argument. wizard will jump to step "2" at first
  //buttons: '.wizard-actions:eq(0)'
  }).on('actionclicked.fu.wizard', function(e, info) {
    if (info.step == 1 && $validation) {
      if (!$('#validation-form').valid())
        e.preventDefault();
    }
  }).on('finished.fu.wizard', function(e) {
    submitMode = true;
    $('#submit-btn').click();
    /* bootbox
        .dialog({
          message : "포켓몬 트레이너 라이센스 등록 신청서를 제출하시겠습니까?",
          buttons : {
            "success" : {
              "label" : "제출",
              "className" : "btn-sm btn-primary"
            },
            "cancel" : {
              "label" : "취소",
              "className" : "btn-sm btn-default"
            }
          }
        }); */
  }).on('stepclick.fu.wizard', function(e) {
    //e.preventDefault();//this will prevent clicking and selecting steps
  });
  //jump to a step
  /**
  var wizard = $('#fuelux-wizard-container').data('fu.wizard')
  wizard.currentStep = 3;
  wizard.setState();
   */

  // determine selected step
  // wizard.selectedItem().step
  // hide or show the other form which requires validation
  // this is for demo only, you usullay want just one form in your application
  $('#register-member-view #skip-validation').removeAttr('checked').on('click', function() {
    $validation = this.checked;
    if (this.checked) {
      $('#register-member-view #sample-form').hide();
      $('#register-member-view #validation-form').removeClass('hide');
    } else {
      $('#register-member-view #validation-form').addClass('hide');
      $('#register-member-view #sample-form').show();
    }
  });

  // documentation : http://docs.jquery.com/Plugins/Validation/validate
  $('#register-member-view #validation-form')
      .validate(
          {
            errorElement : 'div',
            errorClass : 'help-block',
            focusInvalid : false,
            ignore : "",
            rules : {
              email : {
                required : true,
                email : true,
                remote : {
                  // email duplication check code
                  url : 'api/user-email-check',
                  method : 'GET',
                  data : {
                    email : function() {
                      $('.email-help').css('display', 'none');
                      return $('#email').val();
                    }
                  },
                  dataType : "json",
                  dataFilter : function(user) {
                    if (user == 'null') {
                      return true;
                    } else {
                      return false;
                    }
                    ;
                  }
                }
              },
              password : {
                required : true,
                minlength : 4,
                maxlength : 12
              },
              password2 : {
                required : true,
                minlength : 4,
                maxlength : 12,
                equalTo : "#password"
              },
              nickname : {
                required : true,
                maxlength : 8,
                remote : {
                  url : "api/user-nickname-check",
                  method : "GET",
                  data : {
                    nickname : function() {
                      $('.nickname-help').css('display','none');
                      return $("#nickname").val();
                    }
                  },
                  dataType : "text",
                  dataFilter : function(nickname) {
                    if (nickname == "null") {
                      return true;
                    } else {
                      return false;
                    }
                    ;
                  }
                }
              }
            },

            messages : {
              email : {
                required : "이메일 주소를 입력해주세요.",
                email : "이메일 형식이 맞지 않습니다.",
                remote : "이미 사용중인 이메일 입니다."
              },
              password : {
                required : "패스워드를 입력해주세요.",
                minlength : "4자 이상 12자 이하로 입력해주세요.",
                maxlength : "4자 이상 12자 이하로 입력해주세요."
              },
              password2 : {
                required : "패스워드 확인을 입력해주세요.",
                minlength : "4자 이상 12자 이하로 입력해주세요.",
                maxlength : "4자 이상 12자 이하로 입력해주세요.",
                equalTo : "패스워드가 틀립니다."
              },
              nickname : {
                required : "닉네임을 입력해주세요.",
                maxlength : "8자 이하로 입력해주세요.",
                remote : "이미 사용중인 닉네임이거나 공백 또는 사용불가능한 특수문자가 포함되어 있습니다."
              },
            },

            highlight : function(e) {
              $(e).closest('.form-group').removeClass(
                  'has-info').addClass('has-error');
            },

            success : function(e) {
              $(e).closest('.form-group').removeClass(
                  'has-error');//.addClass('has-info');
              $(e).remove();
            },

            errorPlacement : function(error, element) {
              if (element.is('input[type=checkbox]')
                  || element.is('input[type=radio]')) {
                var controls = element
                    .closest('div[class*="col-"]');
                if (controls.find(':checkbox,:radio').length > 1)
                  controls.append(error);
                else
                  error.insertAfter(element.nextAll(
                      '.lbl:eq(0)').eq(0));
              } else if (element.is('.select2')) {
                error
                    .insertAfter(element
                        .siblings('[class*="select2-container"]:eq(0)'));
              } else if (element.is('.chosen-select')) {
                error
                    .insertAfter(element
                        .siblings('[class*="chosen-container"]:eq(0)'));
              } else
                error.insertAfter(element.parent());
            },

            submitHandler : function(form) {
              if (submitMode) {
                form.submit();
              }
            },
            invalidHandler : function(form) {
            }
          });
  $('#register-member-view textarea.limited').inputlimiter({
    remText : '%n 자 남았습니다.',
    limitText : '최대 %n자 까지 입력 가능합니다.'
  });

  $(document)
      .one(
          'ajaxloadstart.page',
          function(e) {
            $('#register-member-view textarea[class*=autosize]').trigger(
                'autosize.destroy');
            $('#register-member-view .limiterBox,.autosizejs').remove();
            $(
                '#register-member-view .daterangepicker.dropdown-menu,.colorpicker.dropdown-menu,.bootstrap-datetimepicker-widget.dropdown-menu')
                .remove();
          });

});
