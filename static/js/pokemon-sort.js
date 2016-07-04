jQuery(function($) {

	var mode = 1;//1:전체, 2:보유, 3:미보유

	var condition = "noCondition";
	var value = "noValue";

	if ($('#filter-allHave') != null) {
		$('#filter-allHave').click(function() {
			mode = 1;
			$('#filter-have').removeClass('badge-info').addClass('badge-default');
			$('#filter-noHave').removeClass('badge-info').addClass('badge-default');
			$(this).addClass('badge-info').removeClass('badge-default');
			
			$('.collection-item').each(function() {
				//현재 조건이 무엇인지 체크
				if (condition != 'noCondition') {
					if ($(this).attr('data-' + condition) == value) {
						$(this).show();
					} else {
						$(this).hide();
					}
				} else {
					$(this).show();
				}
			});
		});
	}

	if ($('#filter-have') != null) {
		$('#filter-have').click(function() {
			mode = 2;
			$(this).siblings().removeClass('badge-info').addClass('badge-default');
			$(this).addClass('badge-info').removeClass('badge-default');
			//보유하지 않은 아이템 가리기
			$('.collection-item[data-have="미보유"]').each(function() {
				$(this).hide();
			});
			//보유아이템 보여주기
			$('.collection-item[data-have="보유"]').each(function() {
				//현재 조건이 무엇인지 체크
				if (condition != 'noCondition') {
					if ($(this).attr('data-' + condition) == value) {
						$(this).show()
					} else {
						$(this).hide();
					}
				} else {
					$(this).show()
				}
			});
		});
	}

	if ($('#filter-noHave') != null) {
		$('#filter-noHave').click(function() {
			mode = 3;
			$(this).siblings().removeClass('badge-info').addClass('badge-default');
			$(this).addClass('badge-info').removeClass('badge-default');
			//보유아이템 보여주기
			$('.collection-item[data-have="미보유"]').each(function() {
				//현재 조건이 무엇인지 체크
				if (condition != 'noCondition') {
					if ($(this).attr('data-' + condition) == value) {
						$(this).show();
					} else {
						$(this).hide();
					}
				} else {
					$(this).show();
				}
			});
			//보유하지 않은 아이템 가리기
			$('.collection-item[data-have="보유"]').each(function() {
				$(this).hide();
			});
		});
	}

	$('#filter-allCost').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'noCondition';
		value = 'noValue';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-1').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '1';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-2').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '2';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-3').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '3';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-4').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '4';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-5').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '5';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-6').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '6';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-7').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '7';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-cost-8').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'cost';
		value = '8';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-allAttr').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'noCondition';
		value = 'noValue';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-normal').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '노말';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-fire').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '불꽃';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-water').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '물';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-electronic').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '전기';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-plant').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '풀';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-ice').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '얼음';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-fly').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '비행';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-fairy').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '요정';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-earth').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '땅';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-venom').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '독';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-fighter').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '격투';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-esper').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '염력';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-bug').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '벌레';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-ghost').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '유령';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-dragon').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '용';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-rock').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '바위';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-evil').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '악';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-attr-iron').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'attr';
		value = '강철';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-allGrade').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'noCondition';
		value = 'noValue';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-grade-b').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'grade';
		value = 'b';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-grade-r').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'grade';
		value = 'r';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-grade-a').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'grade';
		value = 'a';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-grade-ar').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'grade';
		value = 'ar';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-grade-e').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'grade';
		value = 'e';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-grade-l').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'grade';
		value = 'l';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});
	$('#filter-allDesigner').click(function() {
		$(this).siblings().removeClass('badge-info').addClass('badge-default');
		$(this).addClass('badge-info').removeClass('badge-default');
		condition = 'noCondition';
		value = 'noValue';
		if (mode == 1) {
			$('#filter-allHave').click();
		} else if (mode == 2) {
			$('#filter-have').click();
		} else {
			$('#filter-noHave').click();
		}
	});

	var designersBadge = $('div#designer').children('.check-badge');

	for (var cnt = 1; cnt <= designersBadge.length; cnt++) {
		$('#filter-designer-' + cnt).click(function() {
			$(this).siblings().removeClass('badge-info').addClass('badge-default');
			$(this).addClass('badge-info').removeClass('badge-default');
			condition = 'designer';
			value = $(this).children('.designer-name').text();
			if (mode == 1) {
				$('#filter-allHave').click();
			} else if (mode == 2) {
				$('#filter-have').click();
			} else {
				$('#filter-noHave').click();
			}
		})
	}

	/*$('#filter-designer-1').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = '${designers[1]}';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-2').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = 'hpns';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-3').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = 'yogno';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-4').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = '듀듀';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-5').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = 'JYJ';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-6').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = '토토로';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-7').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = '제5공화국';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-8').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = '레옹엄마';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});
	$('#filter-designer-9').click(function() {
	$(this).siblings().removeClass('badge-info').addClass('badge-default');
	$(this).addClass('badge-info').removeClass('badge-default');
	condition = 'designer';
	value = '딩신';
	if (mode == 1) {
	$('#filter-allHave').click();
	} else if (mode == 2) {
	$('#filter-have').click();
	} else {
	$('#filter-noHave').click();
	}
	});*/



	/*$('#filter-noHave').click(function() {
	if (mode != 1) {
	$(this).toggleClass('badge-info').toggleClass('badge-default');
	mode = 1;
	}
	});
	$('#filter-allHave').click(function() {
	$(this).toggleClass('badge-info').toggleClass('badge-default');
	$('#filter-have').removeClass('.badge-info').addClass('.badge-default');
	$('#filter-noHave').removeClass('.badge-info').addClass('.badge-default');
	if (allhave == 0) {
	allhave = 1;
	$('.collection-item[data-have="보유"]').each(function() {
	var id = $(this).attr('id');
	// 만약 다른 showing그룹에 있으면 보이기
	if (valueInArray(id, "haves")) {
	$(this).show();
	}
	});
	$('.collection-item[data-have="미보유"]').each(function() {
	var id = $(this).attr('id');
	// 만약 다른 showing그룹에 있으면 보이기
	if (valueInArray(id, "noHaves")) {
	$(this).show();
	}
	});
	} else if (allHave == 1) {
	allHave = 0;
	$('.collection-item[data-have="보유"]').each(function() {
	var id = $(this).attr('id');
	// 만약 다른 showing그룹에 없으면 숨기기
	if (!valueInArray(id, "haves")) {
	$(this).hide();
	}
	});
	$('.collection-item[data-have="미보유"]').each(function() {
	var id = $(this).attr('id');
	// 만약 다른 showing그룹에 있으면 보이기
	if (valueInArray(id, "noHaves")) {
	$(this).show();
	}
	});
	}
	});

	valueInArray = function(value, array) {
	if(array != "haves") {
	if (have == 1 && $.inArray(value, haves) !== -1) {
	return true;
	}
	}
	if(array != "noHaves") {
	if (noHave == 1 && $.inArray(value, noHaves) !== -1) {
	return true;
	}
	}
	if(array != "costs1") {
	if (cost1 == 1 && $.inArray(value, costs1) !== -1) {
	return true;
	}
	}
	if(array != "costs2") {
	if (cost2 == 1 && $.inArray(value, costs2) !== -1) {
	return true;
	}
	}
	if(array != "costs3") {
	if (cost3 == 1 && $.inArray(value, costs3) !== -1) {
	return true;
	}
	}
	if(array != "costs4") {
	if (cost4 == 1 && $.inArray(value, costs4) !== -1) {
	return true;
	}
	}
	if(array != "costs5") {
	if (cost5 == 1 && $.inArray(value, costs5) !== -1) {
	return true;
	}
	}
	if(array != "normalAttrs") {
	if (normal == 1 && $.inArray(value, normalAttrs) !== -1) {
	return true;
	}
	}
	if(array != "fireAttrs") {
	if (fire == 1 && $.inArray(value, fireAttrs) !== -1) {
	return true;
	}
	}
	if(array != "waterAttrs") {
	if (water == 1 && $.inArray(value, waterAttrs) !== -1) {
	return true;
	}
	}
	if(array != "elecAttrs") {
	if (elec == 1 && $.inArray(value, elecAttrs) !== -1) {
	return true;
	}
	}
	if(array != "plantAttrs") {
	if (plant == 1 && $.inArray(value, plantAttrs) !== -1) {
	return true;
	}
	}
	if(array != "iceAttrs") {
	if (ice == 1 && $.inArray(value, iceAttrs) !== -1) {
	return true;
	}
	}
	if(array != "flyAttrs") {
	if (fly == 1 && $.inArray(value, flyAttrs) !== -1) {
	return true;
	}
	}
	if(array != "fairyAttrs") {
	if (fairy == 1 && $.inArray(value, fairyAttrs) !== -1) {
	return true;
	}
	}
	if(array != "earthAttrs") {
	if (earth == 1 && $.inArray(value, earthAttrs) !== -1) {
	return true;
	}
	}
	if(array != "venomAttrs") {
	if (venom == 1 && $.inArray(value, venomAttrs) !== -1) {
	return true;
	}
	}
	if(array != "bGrades") {
	if (b == 1 && $.inArray(value, bGrades) !== -1) {
	return true;
	}
	}
	if(array != "rGrades") {
	if (r == 1 && $.inArray(value, rGrades) !== -1) {
	return true;
	}
	}
	if(array != "aGrades") {
	if (a == 1 && $.inArray(value, aGrades) !== -1) {
	return true;
	}
	}
	if(array != "arGrades") {
	if (ar == 1 && $.inArray(value, arGrades) !== -1) {
	return true;
	}
	}
	if(array != "eGrades") {
	if (e == 1 && $.inArray(value, eGrades) !== -1) {
	return true;
	}
	}
	if(array != "lGrades") {
	if (l == 1 && $.inArray(value, lGrades) !== -1) {
	return true;
	}
	}
	if(array != "designers1") {
	if (d1 == 1 && $.inArray(value, designers1) !== -1) {
	return true;
	}
	}
	if(array != "designers2") {
	if (d2 == 1 && $.inArray(value, designers2) !== -1) {
	return true;
	}
	}
	if(array != "designers3") {
	if (d3 == 1 && $.inArray(value, designers3) !== -1) {
	return true;
	}
	}
	if(array != "designers4") {
	if (d4 == 1 && $.inArray(value, designers4) !== -1) {
	return true;
	}
	}
	if(array != "designers5") {
	if (d5 == 1 && $.inArray(value, designers5) !== -1) {
	return true;
	}
	}
	if(array != "designers6") {
	if (d6 == 1 && $.inArray(value, designers6) !== -1) {
	return true;
	}
	}
	if(array != "designers7") {
	if (d7 == 1 && $.inArray(value, designers7) !== -1) {
	return true;
	}
	}
	if(array != "designers8") {
	if (d8 == 1 && $.inArray(value, designers8) !== -1) {
	return true;
	}
	}
	if(array != "designers9") {
	if (d9 == 1 && $.inArray(value, designers9) !== -1) {
	return true;
	}
	}
	return false
	};*/
});
