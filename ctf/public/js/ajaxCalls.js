/*jslint esversion:6 */

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
    type: 'GET',
    statusCode: {
      201: (data) => onSuccess(data),
      400: (data) => onError(data),
      401: (data) => onError(data)
    }
  });
}
