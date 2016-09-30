/*jslint esversion: 6 */

function displayError() {
  $('#invalid-msg').css('display', 'inline');
}

function inputToJSON(formId) {
  let json = {};
  $('#'+formId+' input').each(function() {
    if (this.value) json[this.id] = this.value;
  });
  return json;
}

function changeError(msg) {
  displayError();
  let responseText = JSON.parse(msg.responseText);
  $('#invalid-msg').text(responseText.error);
  return false;
}

function ajaxPost(url, jsonData, onSuccess, onError) {
  $.ajax({
    url: url,
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(jsonData),
    statusCode: {
      201: (data) => onSuccess(data),
      400: (data) => onError(data),
      401: (data) => onError(data)
    }
  });
}

function submitLogin() {
  let info = inputToJSON('login');

  ajaxPost('/v1/session', info,
    (data) => $('#flag').text(data.flag),
    changeError);
}

function submitSignup() {
  let info = inputToJSON('signup');

  ajaxPost('/v1/user', info,
    () => window.location.href = '/',
    changeError);
}
