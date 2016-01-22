
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 300);
  });
}

function getInstagramImages(json, limit) {
  for ( i = 0; (i < limit)&&(i < 20); i++ ) {
    if ( json.items[i].videos !== undefined ) {
      limit += 1;
      continue;
    }
    var link = json.items[i].link;
    var imgSrc = link + 'media/?size=m';
    var instapic = $('<div class="instapic-wrapper"><a class="instapic" href="'+link+'" target="_blank" style="background-image: url('+imgSrc+');"></a></div>');
    $('.instagram').append(instapic);
  }
}

$(document).ready( function() {

  $('.toggle-menu-link').click( function(e) {
    $('.main.menu').toggleClass('menu-hidden');
    $('.toggle-menu-link').toggleClass('toggle-link-hidden');
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // esc
      $('.main.menu').addClass('menu-hidden');
      $('.close-menu').addClass('toggle-link-hidden');
      $('.view-menu').removeClass('toggle-link-hidden');
    }
  });

  $('.in-page-link').each(function() {
    var target = $(this).attr('href');
    if (target.charAt(0) == '#') {
      $(this).click(function(e) {
        e.preventDefault();
        $(target).scrollView();
      });
    }
  });

  $.jsonp({
    url: 'https://www.instagram.com/catchfirecreate/media/',
    success: function(data){
      getInstagramImages(data, 4);
    },
    error: function() {
      $('.instagram').append('<p class="error">Feed unavailable at this time.</p>');
    },
    beforeSend: function() {
      $('.loading').show();
    },
    complete: function() {
      $('.loading').hide();
    }

  });

});

