/*jslint esversion: 6 */

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return document.cookie.substring(c_start, c_end);
    }
  }
  return "";
}

function checkLoggedIn() {
  let authRaw = getCookie('auth');
  if (authRaw) {
    let auth = JSON.parse(authRaw);
    if (auth) {
      window.location.href = '/profile.html';
    }
  }
}

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

function addCookiesAndLoad(username) {
  document.cookie = 'username=' + username + ';';
  document.cookie = 'auth=true;';
  window.location.href = '/profile.html';
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
    (data) => addCookiesAndLoad(data.username),
    changeError);
}

function submitSignup() {
  let info = inputToJSON('signup');

  ajaxPost('/v1/user', info,
    () => window.location.href = '/',
    changeError);
}
