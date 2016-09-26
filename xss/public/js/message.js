/*jslint node: true */
/*jslint esversion: 6 */
/*globals $:false */
/*globals window:false */
/*globals document:false */
'use strict';

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return document.cookie.substring(c_start, c_end);
    }
  }
  return "";
}

function displayError() {
  $('#invalid-msg').css('display', 'inline');
}

function changeError(msg) {
  displayError();
  $('#invalid-msg').text(msg);
  return false;
}

function logout() {
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  window.location.href = '/';
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

function ajaxGet(url, onSuccess, onError) {
  $.ajax({
    url: url,
    contentType: 'application/json',
    type: 'GET',
    statusCode: {
      201: (data) => onSuccess(data),
      400: (data) => onError(data),
      401: (data) => onError(data)
    }
  });
}

function checkAuth() {
  let username = getCookie('username');
  let password = getCookie('password');
  if (username && password) {
    let login = {
      username: username,
      password: password
    };
    ajaxPost('/v1/session', login,
      () => {},
      logout
    );
  } else {
    logout();
  }
}

function sendMessage() {
  let recipient = $("#recipient option:selected").text();
  let subject = $('#subject').val();
  let message = $('#message').val();
  if (recipient && message && subject) {
    let messageAll = {
      recipient: recipient,
      subject: subject,
      message: message
    };
    ajaxPost('/v1/send', messageAll,
      () => window.location.href = '/profile.html',
      (data) => changeError(JSON.parse(data.responseText).error));
  } else {
    changeError('Must specify recipient, subject, and message');
  }
}

function addMessagesToView(messages) {
  for (let i = 0; i < messages.length; ++i) {
    let subject = document.createElement('h5');
    subject.innerHTML = messages[i].subject;
    subject.addEventListener('click', function() {
      document.getElementById('content').innerHTML = messages[i].message;
    });
    document.getElementById('messages').appendChild(subject);
  }
}

function populateMessages() {
  let username = getCookie('username');
  let password = getCookie('password');
  if (username && password) {
    let login = {
      username: username,
      password: password
    };
    ajaxGet('/v1/messages?username=' + username + '&password=' + password,
      addMessagesToView,
      () => {}
    );
  } else {
    window.location.href = '/';
  }
}
