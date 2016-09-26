/*jslint node: true */
/*jslint esversion: 6 */
/*globals $:false */
/*globals window:false */
'use strict';

let dir = '';

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

function populateFiles(data) {
  $('#files').empty();

  let dirs = data.dirs;
  for (let i = 0; i < dirs.length; ++i) {
    $('#files').append('<a id=' + dirs[i] + ' onclick="viewDir(this.id)">' + dirs[i] + '</a>');
  }

  $('#files').append('<br>');

  let files = data.files;
  for (let i = 0; i < files.length; ++i) {
    $('#files').append('<a id=' + files[i] + ' onclick="viewFile(this.id)">' + files[i] + '</a>');
  }
}

function viewFile(id) {
  let file = dir + id;
  window.location = '/v1/file?name=' + file;
}

function viewDir(id) {
  let nextDir = dir + id;
  ajaxGet('/v1/dir?name=' + nextDir,
    (data) => {
      dir = dir + id + '/';
      populateFiles(data);
    },
    () => {});
}

function onload() {
  ajaxGet('/v1/dir',
    populateFiles,
    () => {});
}
