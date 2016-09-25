/*jslint node: true */
/*jslint esversion: 6 */
/*globals $:false */
/*globals window:false */
/*globals document:false */
/*globals FileReader:false */
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

function checkFile() {
  let file = document.getElementById("file").files[0];
  if (!file) {
    $('#error-message').text('Must choose file');
    $('#upload').prop('disabled', true);
  } else if (file.type.match(/text*/)) {
    $('#error-message').text('');
    $('#upload').prop('disabled', false);
  } else {
    $('#error-message').text('Only text files allowed (beta)');
    $('#upload').prop('disabled', true);
  }
}

function uploadFile() {
  let file = document.getElementById("file").files[0];
  let r = new FileReader();
  r.onload = function(e) {
    let contents = e.target.result;
    let fileNameContents = {
      name: file.name,
      contents: contents
    };
    ajaxPost('/v1/file', fileNameContents,
      () => window.location.href = '/',
      (data) => $('#error-message').text(data.responseText.error));
  };
  r.readAsText(file);
}

function viewFile() {
  let name = $('#file').val();
  if (!name) {
    $('#error-message').text('Must specify file');
    $('#file-contents').text('');
  } else {
    $('#error-message').text('');
    $('#file-contents').text('');
    let file = {
      name: name
    };
    ajaxPost('/v1/view', file,
      (data) => $('#file-contents').text(data.contents),
      (data) => $('#error-message').text(JSON.parse(data.responseText).error)
    );
  }
}

function populateSelectFile(data) {
  let files = data.files;
  for (let i = 0; i < files.length; ++i) {
    $('#file').append('<option val="' + i + '">' + files[i] + '</option>');
  }
}

function uploadOnload() {
  document.getElementById('file').addEventListener('change', checkFile, false);
}

function viewOnload() {
  ajaxPost('/v1/files', undefined,
    populateSelectFile,
    () => {});
}
