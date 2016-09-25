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
  let responseText = JSON.parse(msg.responseText);
  $('#invalid-msg').text(responseText.error);
  return false;
}

function showSuccess() {
  $('#success').css('display', 'block');
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

function getFlag() {
  ajaxPost('/v1/flag', undefined,
    (data) => $('#flag').text(data.flag),
    () => {});
}

function submitLogin() {
  let info = inputToJSON('login');

  ajaxPost('/v1/session', info,
    getFlag,
    changeError);
}
