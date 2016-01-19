jQuery.fn.extend({
  labelFor: function () {
    var focusedName = $(this).attr('name');
    var label = 'label[for=' + focusedName + ']';
    return this.pushStack( $(label) );
  }
});

function resetForm() {
  $('#formspree .expanding').val('').change();
  $('#formspree .text-input').val('');
  enableForm();
}

function enableForm() {
  $('#formspree .form-message').hide();
  $('#form-submit').show();
  $('#formspree :input').each( function() {
    $(this).prop('disabled', false);
  });
}

function disableForm () {
  $('#form-invalid').hide();
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

function showFormInvalid() {
  $('#form-invalid').show();
}

function emailIsValid() {
  var emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var emailValue = $('#formspree input[name=_replyto]').val();
  if ( emailPattern.test(emailValue) ) {
    $('input[name=_replyto]').labelFor().removeClass('invalid');
    return true;
  }
  $('input[name=_replyto]').labelFor().addClass('invalid');
  return false;
}

function writeObfuscatedEmail() {
  // Email obfuscator script 2.1 by Tim Williams, University of Arizona
  // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
  // This code is freeware provided these four comment lines remain intact
  // A wizard to generate this code is at http://www.jottings.com/obfuscator/
  coded = "6BxG.9g001@QAB8s.uOA";
  key = "bhlpuV0CEY3Gxn2UvwimP5sygXqMJaLSd6THor8AkIR1QDc4fBFW9etjOKzZ7N";
  shift = coded.length;
  link = "";
  for ( i = 0; i < coded.length; i++) {
    if ( key.indexOf(coded.charAt(i) )==-1) {
      ltr = coded.charAt(i);
      link += (ltr);
    } else {
      ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
      link += (key.charAt(ltr));
    }
  }
  $('.email').append('<a href="mailto:'+link+'" target="_blank">'+link+'</a>');
  $('#formspree').attr('action','//formspree.io/'+link);
}

function writeObfuscatedPhone() {
  // Email obfuscator script 2.1 by Tim Williams, University of Arizona
  // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
  // This code is freeware provided these four comment lines remain intact
  // A wizard to generate this code is at http://www.jottings.com/obfuscator/
  coded = "8rV.y88.5nsr";
  key = "vmF1khoZsif6ETpdOPWuMBH840zXUR9DtAYn5rSJeQGK3LIlyqxbc7ajVC2gNw";
  shift = coded.length;
  link = "";
  for ( i = 0; i < coded.length; i++ ) {
    if ( key.indexOf(coded.charAt(i))==-1 ) {
      ltr = coded.charAt(i);
      link += (ltr);
    } else {
      ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
      link += (key.charAt(ltr));
    }
  }
  $('.phone').append(link);
}

$(document).ready( function() {

  writeObfuscatedEmail();
  writeObfuscatedPhone();

  $('input:required').labelFor().append('<span class="form-note">(required)</span>');

  $(':input').focus( function() {
    $(this).labelFor().addClass('focus');
  });
  $(':input').blur( function() {
    $(this).labelFor().removeClass('focus');
  });

  $('.reset-form').on('click', function() {
    resetForm();
  });

  $('.enable-form').on('click', function() {
    enableForm();
  });

  $('#formspree').submit(function(e) {
    e.preventDefault();

    if ( !$('input[name=_subject]').val().trim() ) {
      $('input[name=_subject]').val('no subject');
    }

    $.ajax({
      url: '//formspree.io/nate.duffy@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function(xhr, options){
        $('.invalid').removeClass('invalid');
        if ( !emailIsValid() ) {
          xhr.abort();
          showFormInvalid();
        }
      },
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
