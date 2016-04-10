$(document).ready(function() {
    registerInputListener('email', validateEmail, 'emaildiv', getEmailError);
    registerInputListener('username', validateUsername, 'usernamediv', getUsernameError);
    registerInputListener('password',  validatePassword, 'passworddiv', getPasswordError);
    registerInputListener('password', validatePasswordRepeat, 'password_repeatdiv', getPasswordRepeatError);
    registerInputListener('password_repeat', validatePasswordRepeat, 'password_repeatdiv', getPasswordRepeatError);
});

function registerInputListener(elementid, validator, divid, error) {
  const listener = createInputListener(validator, divid, error);
  const element = $('#' + elementid);
  element.change(listener);
  element.keyup(listener);
}

function createInputListener(validator, divid, error) {
  return function () {
    decorateErrorDiv(validator(), divid, error());
    validate();
  };
}

function validate() {
  const validation = (validateEmail() && validateUsername() && validatePassword() && validatePasswordRepeat());
  const register = $('#register');
  if(validation) {
    register.prop('disabled', false);
    register.removeClass('disabled btn-danger');
    register.addClass('btn-success');
  }
  else {
    register.prop('disabled', true);
    register.removeClass('btn-success');
    register.addClass('disabled btn-danger');
  }
}

function validateEmail() {
    const val = $('#email').val();
    const validation = (!isEmpty(val) && isEmail(val));
    return validation;
}

function validateUsername() {
    const val = $('#username').val();
    const validation = !isEmpty(val);
    return validation;
}

function validatePassword() {
    const val = $('#password').val();
    const validation = !isEmpty(val);
    return validation;
}

function validatePasswordRepeat() {
    const val = $('#password_repeat').val();
    const validation = (!isEmpty(val) && ($('#password').val() === val));
    return validation;
}

function isEmpty(val) {
  return (val === '');
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function getEmailError() {
  if(!validateEmail()) return 'Please insert a valid email address.';
  else return '';
}

function getUsernameError() {
  if(!validateUsername()) return 'Please insert a username.';
  else return '';
}

function getPasswordError() {
  if(!validatePassword()) return 'Please insert a password.';
  else return '';
}

function getPasswordRepeatError() {
  if(validatePassword() && !validatePasswordRepeat()) {
    return 'Passwords need to be the same.';
  }
  else return '';
}



function decorateErrorDiv(validation, id, error) {
  const div = $('#' + id);
  const errordiv = $('#' + id + 'error');
  if (validation) {
    div.removeClass('has-error');
    errordiv.text(error);
  }
  else {
    div.addClass('has-error');
    errordiv.text(error);
  }
}
