/*jslint node: true */
/*jslint esversion: 6 */
/*globals $:false */
/*globals window:false */
/*globals document:false */
'use strict';

function displayError() {
  $('#invalid-msg').css('display', 'inline');
}

function changeError(msg) {
  displayError();
  let responseText = JSON.parse(msg.responseText);
  $('#invalid-msg').text(responseText.error);
  return false;
}

function getFlag() {
  $.ajax({
    url: '/v1/flag',
    type: 'GET',
    statusCode: {
      201: (flag) => $('#flag').text(flag.flag),
    }
  });
}

function submitLogin() {
  $.ajax({
    url: '/v1/session',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({ username: $('#username').val(), password: $('#password').val() }),
    statusCode: {
      201: getFlag,
      400: changeError,
      401: changeError
    }
  });
}
