jQuery(function($) {
  $('#loading-outside').style('height', window.innerHeight);
  $('#loading-inside').style('top', window.innerHeight / 2 - 32);
  $('#loading-inside').style('left', $('.main-content-inner').width() / 2 - 32);
});
