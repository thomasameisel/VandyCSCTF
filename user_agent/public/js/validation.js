/*jslint node: true */
/*jslint esversion: 6 */
/*globals $:false */
/*globals window:false */
/*globals document:false */
/*globals navigator:false */
'use strict';

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
  let userAgent = {
    user_agent: navigator.userAgent
  };

  ajaxPost('/v1/session', userAgent,
    (data) => $('#flag').text(data.flag),
    (data) => $('#flag').text(JSON.parse(data.responseText).error));
}
