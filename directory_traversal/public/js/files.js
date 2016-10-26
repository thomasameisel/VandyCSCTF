/*jslint esversion: 6 */

let dir = getParameterByName('name') ? getParameterByName('name') : '';

function getParameterByName(name) {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
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

function populateFiles(data) {
  $('#files').empty();
  if (getParameterByName('name')) {
    $('#files').append('<a id="up_dir" onclick="goUpDir()">Up Directory</a>');
    $('#files').append('<br />');
  }

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

function showMessage(data) {
  $('#files').text(JSON.parse(data.responseText).error);
}

function goUpDir() {
  let dir = getParameterByName('name');
  let upDir = dir.substr(0, dir.indexOf('/')+1);
  if (dir === upDir) window.location = '/';
  else window.location = '/dir?name=' + upDir;
}

function viewFile(id) {
  let file = dir + id;
  window.location = '/file?name=' + file;
}

function viewDir(id) {
  let nextDir = dir + id + '/';
  window.location = '/dir?name=' + nextDir;
}

function onload() {
  let url = '/v1/dir';
  if (getParameterByName('name')) url += '?name=' + getParameterByName('name');
  ajaxGet(url, populateFiles, showMessage);
}
