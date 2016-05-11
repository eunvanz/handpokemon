jQuery(function($) {

  $('#register-member-view #pick-btn')
    .click(function() {
      $('#post-pick').toggle();
      $('#pre-pick').toggle();
    });
  
  $('#register-member-view #repick').click(function() {
    $.ajax({
      url : "main.do?action=repick",
      contentType : "application/json;charset=utf-8",
      dataType : "json",
      type : "post",
      success : refreshMonsters
    });
  });

  $("#register-member-view .flip-btn").click(function() {
    $(".front").toggle();
    $(".back").toggle();
  });

  function refreshMonsters(data) {
    var cnt = 1;
    for ( var i in data) {
      var imgName = "#pick" + cnt;
      var idName = "#pickId" + cnt;
      var costName = "#pickCost" + cnt;
      var labelName = "#pickLabel" + cnt;
      var modalName = "#monster-modal" + cnt;
      $(imgName).attr("src", "assets/images/monsters/" + data[i].img);
      $(idName).val(data[i].id);
      var costHtml;
      if (data[i].cost == 1) {
        costHtml = '<i class="fa fa-star fa-2"></i>';
      } else if (data[i].cost == 2) {
        costHtml = '<i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i>';
      } else if (data[i].cost == 3) {
        costHtml = '<i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i>';
      } else if (data[i].cost == 4) {
        costHtml = '<i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i>';
      } else if (data[i].cost == 5) {
        costHtml = '<i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i><i class="fa fa-star fa-2"></i>';
      }
      var gradeHtml = '<span class="label label-sm label-yellow arrowed-right" >BASIC</span>';
      var attrHtml;
      if (data[i].attr == "노말") {
        attrHtml = '<span class="label label-sm label-grey arrowed-in" style="margin-left: 1px;">노말</span>'
      } else if (data[i].attr == "불꽃") {
        attrHtml = '<span class="label label-sm label-danger arrowed-in" style="margin-left: 1px;">불꽃</span>';
      } else if (data[i].attr == "물") {
        attrHtml = '<span class="label label-sm label-primary arrowed-in" style="margin-left: 1px;">물</span>';
      } else if (data[i].attr == "전기") {
        attrHtml = '<span class="label label-sm label-warning arrowed-in" style="margin-left: 1px;">전기</span>';
      } else if (data[i].attr == "풀") {
        attrHtml = '<span class="label label-sm label-success arrowed-in" style="margin-left: 1px;">풀</span>';
      } else if (data[i].attr == "얼음") {
        attrHtml = '<span class="label label-sm label-info arrowed-in" style="margin-left: 1px;">얼음</span>';
      } else if (data[i].attr == "비행") {
        attrHtml = '<span class="label label-sm label-light arrowed-in" style="margin-left: 1px;">비행</span>';
      } else if (data[i].attr == "요정") {
        attrHtml = '<span class="label label-sm label-pink arrowed-in" style="margin-left: 1px;">요정</span>';
      } else if (data[i].attr == "땅") {
        attrHtml = '<span class="label label-sm label-inverse arrowed-in" style="margin-left: 1px;">땅</span>';
      } else if (data[i].attr == "독") {
        attrHtml = '<span class="label label-sm label-purple arrowed-in" style="margin-left: 1px;">독</span>';
      } else if (data[i].attr == '격투') {
        resultHtml += '<span class="label label-sm label-fighter arrowed-in" style="margin-left: 1px;">격투</span>'
      } else if (data[i].attr == '염력') {
        resultHtml += '<span class="label label-sm label-esper arrowed-in" style="margin-left: 1px;">염력</span>'
      } else if (data[i].attr == '벌레') {
        resultHtml += '<span class="label label-sm label-bug arrowed-in" style="margin-left: 1px;">벌레</span>'
      } else if (data[i].attr == '바위') {
        resultHtml += '<span class="label label-sm label-rock arrowed-in" style="margin-left: 1px;">바위</span>'
      } else if (data[i].attr == '유령') {
        resultHtml += '<span class="label label-sm label-ghost arrowed-in" style="margin-left: 1px;">유령</span>'
      } else if (data[i].attr == '용') {
        resultHtml += '<span class="label label-sm label-dragon arrowed-in" style="margin-left: 1px;">용</span>'
      } else if (data[i].attr == '악') {
        resultHtml += '<span class="label label-sm label-evil arrowed-in" style="margin-left: 1px;">악</span>'
      } else if (data[i].attr == '강철') {
        resultHtml += '<span class="label label-sm label-iron arrowed-in" style="margin-left: 1px;">강철</span>'
      }
      var labelHtml = gradeHtml + attrHtml;
      $(costName).html(costHtml);
      $(labelName).html(labelHtml);

      var nameHtml = "<big>" + data[i].name + "</big>";
      $(modalName + " .monster-name").html(nameHtml);
      $(modalName + " .monster-grade").html(gradeHtml);
      $(modalName + " .monster-attribute").html(attrHtml);
      $(modalName + " .monster-cost").html(costHtml);
      $(modalName + " .monster-description")
          .html(data[i].description);
      $(modalName + " .monster-image").attr("src",
          "assets/images/monsters/" + data[i].img);
      $(modalName + " .monster-hp-bar").attr("style",
          "width:" + (data[i].hp / 200 * 100) + "%;");
      $(modalName + " .monster-power-bar").attr("style",
          "width:" + (data[i].power / 200 * 100) + "%;");
      $(modalName + " .monster-armor-bar").attr("style",
          "width:" + (data[i].armor / 200 * 100) + "%;");
      $(modalName + " .monster-dex-bar").attr("style",
          "width:" + (data[i].dex / 200 * 100) + "%;");
      $(modalName + " .monster-skill1-bar").attr("style",
          "width:" + (data[i].skill1Power / 200 * 100) + "%;");
      $(modalName + " .monster-hp").html(data[i].hp);
      $(modalName + " .monster-power").html(data[i].power);
      $(modalName + " .monster-armor").html(data[i].armor);
      $(modalName + " .monster-dex").html(data[i].dex);
      $(modalName + " .monster-skill1-power").html(
          data[i].skill1Power);
      $(modalName + " .monster-skills").html(data[i].skill1Name);
      cnt++;
    }
  }

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
  $('#register-member-view #submit-btn').click(function() {
    $('#register-member-view #validation-form').submit();
  });

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
                  url : 'user-email-check',
                  method : 'GET',
                  data : {
                    email : function() {
                      $('.email-help').css('display', 'none');
                      return $('#email').val();
                    }
                  },
                  dataType : "json",
                  dataFilter : function(user) {
                    console.log('user: ' + user);
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
                  url : "user-nickname-check",
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