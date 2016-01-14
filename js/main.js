jQuery.fn.extend({
  labelFor: function () {
    var focusedName = $(this).attr('name');
    var label = 'label[for=' + focusedName + ']';
    return this.pushStack( $(label) );
  }
});

function resetForm() {
  $('#formspree .form-message').hide();
  $('#formspree .text-input').val('');
  $('#form-submit').show();
  $('#formspree :input').each( function() {
    $(this).prop('disabled', false);
  });
}

function disableForm () {
  $('#form-submit').hide();
  $('#formspree :input').each( function() {
    $(this).prop('disabled', true);
  });
}

function showFormSuccess() {
  $('#form-success').show();
}

function showFormError() {
  $('#form-error').show();
}

$(document).ready( function() {

  $(':input').focus( function() {
    $(this).labelFor().addClass('focus');
  });
  $(':input').blur( function() {
    $(this).labelFor().removeClass('focus');
  });

  $('.reset-form').on('click', function() {
    resetForm();
  });

  $('#formspree').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: '//formspree.io/nate.duffy@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(data) {
        disableForm();
        showFormSuccess();
      },
      error: function(err) {
        disableForm();
        showFormError();
      }
    });
  });

});
