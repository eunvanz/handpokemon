/* eslint-disabled */

var gameSpeed = $('#game-speed').val();
var speed = 1 / gameSpeed;
var speed2 = gameSpeed;

jQuery(function($) {
  var target = $('.battle-arena');
  var height = target.height();
  var width = target.width();
  var left = target.position().left;
  // 화면에 맞게 중앙 공백을 조정
  $('.vs-space').css(
    'height',
    $(document).height()
    - $('.speed-controller').height()
    - $('.user-control').height() * 2
    - $('.mon-object').height() * 2
    - $('#navbar-container').height()
    - ($(window).width() < 767 ? 0 : 60)
  );

  // 치명타 효과 사이즈 조정
  $('.blood-attack')
  .css(
    'height',
    $('.page-content').height()
  )
  .css(
    'width',
    $('.page-content').width()
  );

  // 시합 속도 슬라이더 초기화
  $('#speed-slider').css('width', '100%').slider({
    value: gameSpeed,
    range: 'min',
    min: 1,
    max: 8,
    step: 1,
    slide: function(event, ui) {
      var number = ['', 1, 2, 3, 4, 5, 6, 7, 8];
      var val = parseInt(ui.value);
      speed = 1 / (number[val]);
      speed2 = number[val];
      $('.game-speed').text(speed2);
    }
  });

  // 선공 시작 펑션 호출
  var firstAttack = $('#first-attack').val();
  if (firstAttack === 0) {
    turnProcess('user');
  } else {
    turnProcess('rival');
  }
});


function turnProcess(attacker) {
  var attackMon = null;
  var defender = null;
  var defenseMon = null;
  var option1 = null;
  var option2 = null;
  var option3 = null;
  var duration = 1;
  var desLeft = 0;
  var desTop = 0;
  var baseLeft = 0;
  var baseTop = 0;
  var avoid = null;
  var damagedMove = 5;
  var damage = 0;
  var restHp = 0;
  var cnt = 0;
  if (attacker === 'rival') {
    defender = 'user';
  } else {
    defender = 'rival';
  }

  var data = $('#result-data').val();
  adjustResult(JSON.parse(data));

  // 시합 결과 데이터를 적용
  function adjustResult(data) {

    var i = 0;
    turn(data);

    function turn(data) {
      cnt++;
      attackMon = $('.' + data[i].attacker + '-mon-' +
        data[i].attackMon);
      defenseMon = $('.' + data[i].defender + '-mon-' +
        data[i].defenseMon);

      // 첫번째 룰렛의 옵션
      option1 = {
        speed: 10 * speed2,
        duration: duration * speed,
        stopImageNumber: data[i].attackMon,
      };
      // 두번째 룰렛의 옵션
      option2 = {
        speed: 10 * speed2,
        duration: duration * speed,
        stopImageNumber: data[i].defenseMon,
      };
      // 세번째 룰렛의 옵션
      option3 = {
        speed: 10 * speed2,
        duration: duration * speed,
        stopImageNumber: data[i].attackType,
        stopCallback: function($stopElm) {
          setTimeout(function() {
            attackProcess();
          }, 800 * speed);
        }
      };

      if (cnt > 2) {
        $('div.' + data[i].attacker + '-roulette-1').roulette('option', option1);
        $('div.' + data[i].attacker + '-roulette-2').roulette('option', option2);
        $('div.' + data[i].attacker + '-roulette-3').roulette('option', option3);
      } else {
        $('div.' + data[i].attacker + '-roulette-1').roulette(option1);
        $('div.' + data[i].attacker + '-roulette-2').roulette(option2);
        $('div.' + data[i].attacker + '-roulette-3').roulette(option3);
      }

      // 직전 턴의 상성보너스 정보 숨김
      hideBonusInfo();

      setTimeout(function() {
        $('div.' + data[i].attacker + '-roulette-1').roulette('start');
      }, 100 * speed);
      setTimeout(function() {
        $('div.' + data[i].attacker + '-roulette-2').roulette('start');
      }, 300 * speed);
      setTimeout(function() {
        $('div.' + data[i].attacker + '-roulette-3').roulette('start');
      }, 500 * speed);
      setTimeout(showBonusInfo, 2500 * speed);

      function attackProcess() {
        //공격몬 액션
        //특수공격일경우
        if (data[i].attackType === 2) {
          specialAction();
        }
        if (data[i].attackType === 2) {
          setTimeout(function() {
            goToAttack();
          }, 1000 * speed);
        } else {
          goToAttack();
        }
      }

      // 상성보너스를 출력하는 함수
      function showBonusInfo() {
        var infoContainer = $('.' + data[i].attacker + '-bonus-info');
        var typeContainer = $('.' + data[i].attacker + '-bonus-info .bonus-type');
        var pctContainer = $('.' + data[i].attacker + '-bonus-info .bonus-pct');
        var bonus = Number(data[i].bonus);
        var rate = bonus * 100 - 100;
        if (rate === 0) {
          return;
        }
        var bonusType = '';
        if (rate > 0) {
          bonusType = '상성보너스';
          pctContainer.removeClass('text-danger');
          pctContainer.addClass('text-primary');
        } else {
          bonusType = '상성패널티';
          pctContainer.removeClass('text-primary');
          pctContainer.addClass('text-danger');
        }
        typeContainer.text(bonusType);
        pctContainer.text(Math.round(rate) + '%');
        infoContainer
        .animate(
          {
            opacity: 1
          },
          250 * speed
        );
      }

      // 상성보너스를 숨기는 함수
      function hideBonusInfo() {
        var infoContainer = $('.' + data[i].attacker + '-bonus-info');
        infoContainer
        .animate(
          {
            opacity: 0
          },
          250 * speed
        );
      }

      // 특수기술 발동시 액션 처리 함수
      function specialAction() {
        var skillNameContainer = $('.' + data[i].attacker + '-mon-' + data[i].attackMon + '-special');
        // 스킬명을 화면에 세팅
        skillNameContainer.text(data[i].skillName);
        // 스킬명 표시 애니메이션
        skillNameContainer
        .css('opacity', '1')
        .animate(
          {
            opacity: 0,
            top: '-40px',
            fontSize: '20px'
          },
          2000 * speed,
          function() {
            skillNameContainer.css('top', '-20px').css('fontSize', '10px');
          }
        );
        attackMon
        .effect('pulsate', 1000 * speed);
      }

      // 공격 애니메이션 구현 함수
      function goToAttack() {
        baseLeft = attackMon.offset().left;
        baseTop = attackMon.offset().top;
        avoid = data[i].avoid;
        if (data[i].attacker === 'rival') {
          desLeft = defenseMon.offset().left - baseLeft;
          desTop = defenseMon.offset().top - baseTop - 50;
        } else {
          desLeft = defenseMon.offset().left - baseLeft;
          desTop = defenseMon.offset().top - baseTop + 50;
        }
        attackMon.animate(
          {
            left: '+=' + desLeft,
            top: '+=' + desTop
          },
          500 * speed,
          'easeInCirc',
          function() {
            //피하지 못했을 때
            if (!avoid) {
              if (data[i].damage >= 400) {
                $('.blood-attack').css('display', 'block');
                $('.blood-attack').animate(
                  {
                    opacity: 0.5
                  },
                  400 * speed
                );
                setTimeout(function() {
                  $('.blood-attack').animate(
                    {
                      opacity: 0
                    },
                    400 * speed
                  );
                  $('.blood-attack').css('display', 'none');
                }, 400 * speed);
              }
              if (data[i].damage >= 250) {
                $('.battle-arena').effect('bounce', 'fast');
              }
              if (data[i].attacker == 'user') {
                damagedMove = damagedMove * -1;
              }
              defenseMon.effect('bounce', 'fast');

            //피했을때
            } else {
              defenseMon.animate(
                {
                  left: '-=50'
                },
                100 * speed,
                function() {
                  defenseMon.animate({
                    left: '+=50'
                  }, 100 * speed);
                }
              );
            }

            //돌아옴
            setTimeout(function() {
                attackMon.animate({ left: '-=' + desLeft, top: '-=' + desTop }, 500 * speed, 'easeOutCirc');
              },
              100 * speed
            );
          }
        );
        if (!avoid) {
          setTimeout(damaged, 800 * speed);
        } else {
          setTimeout(function() {
            var damageContainer = $('.' + data[i].defender + '-mon-' + data[i].defenseMon + '-damage');
            damageContainer
            .text('회피')
            .css('opacity', '1')
            .animate({
                opacity: 0,
                top: '-40px',
                fontSize: '20px'
              },
              2000 * speed,
              function() {
                damageContainer
                .css('top', '-20px;')
                .css('fontSize', '10px');
              }
            );
          }, 500 * speed
          );
          setTimeout(function() {
            i++;
            turn(data);
          }, 2000 * speed);
        }
      }

      // 데미지 표시 메소드
      function damaged() {
        //데미지
        damage = data[i].damage;
        //남은HP
        restHp = data[i].restHp;
        //올라오는 데미지
        var damageContainer = $('.' + data[i].defender + '-mon-' + data[i].defenseMon + '-damage');
        var fontSize = 0;
        var top = '-40px';
        if (damage < 100) {
          fontSize = 18;
        } else if (damage < 150) {
          fontSize = 24;
          top = '-46px';
        } else if (damage < 200) {
          fontSize = 30;
          top = '-56px';
        }  else if (damage < 250) {
          fontSize = 40;
          top = '-66px';
        }  else if (damage < 300) {
          fontSize = 54;
          top = '-70px';
        } else if (damage < 350) {
          fontSize = 72;
          top = '-88px';
        }  else if (damage < 400) {
          fontSize = 92;
          top = '-100px';
        } else {
          fontSize = 120;
          top = '-110px';
        }
        if (data[i].avoid) {
          damageContainer
          .css('opacity', '1')
          .animate(
            {
              opacity: 0,
              top: '-40px',
              fontSize: fontSize + 'px'
            },
            2000 * speed,
            function() {
              damageContainer.css('top', '-20px').css('fontSize', '10px');
            }
          );
        } else {
          damageContainer
          .text('-' + damage)
          .css('opacity', '1')
          .animate(
            {
              opacity: 0,
              top: top,
              fontSize: fontSize + 'px'
            },
            2000 * speed,
            function() {
              damageContainer.css('top', '-20px').css('fontSize', '10px');
            }
          );
        }

        //에너지바에 반영
        var hpInfoContainer = $('.' + data[i].defender + '-mon-' + data[i].defenseMon + '-restHp');
        var hpBar = $('.' + data[i].defender + '-mon-' + data[i].defenseMon + ' .progress-bar');
        hpInfoContainer.text(restHp);
        hpBar.animate(
          {
            width: (restHp / data[i].maxHp) * 100 + '%'
          },
          200 * speed
        );

        //죽었을경우
        if (data[i].restHp === 0) {
          defenseMon.css('opacity', '.5');
        }
        //게임이 끝났을 경우
        if (data[i].finished) {
          setTimeout(function() {
            finished();
          }, 1000 * speed);
          return;
        }
        setTimeout(function() {
          i++;
          turn(data);
        }, 800 * speed);
      }
    }
  }
}

function finished() {
  $('.blood-attack').css('display', 'none');
  $('.battle-result').css('display', 'block');
  $('.result-container').css('width', $('.battle-result').width()).css(
    'height', $('.main-content-inner').height()).css('position',
    'absolute').css('top', '0px');
  $('.result-content').css(
    'top',
    $('.result-container').height() / 2 -
    $('.result-content').height() / 2).css(
    'left',
    $('.result-container').width() / 2 -
    $('.result-content').width() / 2);
}
