$(document).ready(function(){
    registerInputListener('email', validateEmail, 'emaildiv');
    registerInputListener('username', validateUsername, 'usernamediv');
    registerInputListener('password',  validatePassword, 'passworddiv');
    registerInputListener('password', validatePasswordRepeat, 'password_repeatdiv');
    registerInputListener('password_repeat', validatePasswordRepeat, 'password_repeatdiv');
});

function registerInputListener(elementid, validator, divid) {
  const listener = createInputListener(validator, divid);
  const element = $('#' + elementid);
  element.change(listener);
  element.keyup(listener);
}

function createInputListener(validator, divid) {
  return function () {
    decorateErrorDiv(validator(), divid);
    validate();
  };
}

function validate() {
  const validation = (validateEmail() & validateUsername() & validatePassword() & validatePasswordRepeat());
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

function decorateErrorDiv(validation, id) {
  const div = $('#' + id);
  if (validation) {
    div.removeClass('has-error');
  }
  else {
    div.addClass('has-error');
  }
}
