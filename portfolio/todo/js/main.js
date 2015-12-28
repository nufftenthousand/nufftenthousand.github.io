$(document).ready(function() {
  // this could be done better, but it works

  adjustBody();   // init

  $(window).resize(function() {
    adjustBody();
  });

  $('.main-input').bind('input propertychange', function() {
    adjustBody();
  });

  $('.x-out').click(function() {
    $(this).parent().hide();
    adjustBody();
  });

  function adjustBody() {
    var calcHeight = $('#display').height() - $('#header').height() - $('#footer').height();
    $('#body').height(calcHeight);
  }
});
