$(document).ready( function() {

  $(':input').focus( function() {
    $(this).labelFor().addClass('focus');
  });
  $(':input').blur( function() {
    $(this).labelFor().removeClass('focus');
  });

  jQuery.fn.extend({
    labelFor: function () {
      var focusedName = $(this).attr('name');
      var label = 'label[for=' + focusedName + ']';
      return this.pushStack( $(label) );
    }
  });

  $('#formspree').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: '//formspree.io/nate.duffy@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(data) {
        console.log('Success!');
        console.log(data);
      },
      error: function(err) {
        console.log('Error!');
        console.log(data);
      }
    });
  });

});
