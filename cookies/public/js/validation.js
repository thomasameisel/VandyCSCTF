/*jslint node: true */
/*jslint esversion: 6 */
/*globals $:false */
/*globals window:false */
/*globals document:false */
'use strict';

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
  $('#invalid-msg').text(msg);
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
    () => window.location.href = '/start.html',
    displayError);
}

function submitSignup() {
  let info = inputToJSON('signup');

    ajaxPost('/v1/user', info,
      () => window.location.href = '/profile.html?username='+info.username,
      displayError);
}
