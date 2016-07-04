jQuery(function($) {
  // var oldie = /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase());
  $('.easy-pie-chart.percentage').each(function() {
    $(this).easyPieChart({
      barColor: $(this).data('color'),
      trackColor: '#EEEEEE',
      scaleColor: false,
      lineCap: 'butt',
      lineWidth: 6,
      animate: 1000,
      size: 75,
    }).css('color', $(this).data('color'));
  });
  if ($('.function-section').position()) {
    var fsPosition = $('.function-section').position().top;
    $(window).scroll(function() {
      var scrollHeight = $(window).scrollTop();
      if (scrollHeight >= fsPosition) {
        $('.function-bar').css('top', function() {
          return $(window).scrollTop() - fsPosition;
        });
      } else {
        $('.function-bar').css('top', '0px');
      }
    });
  }
});
