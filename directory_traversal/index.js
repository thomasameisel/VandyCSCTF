/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let fs = require('fs');

let app = express();
app.use(express.static('public'));
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/file', function(req, res) {
  let file = req.query.name;
  fs.readFile('./public/files/' + file, function(err, data) {
    if (err) res.status(401).send({ error: err.message });
    else {
      res.contentType(req.query.name.substr(req.query.name.lastIndexOf('/') + 1));
      res.status(201).send(data);
    }
  });
});

app.get('/v1/dir', function(req, res) {
  let dir = req.query.name;
  if (!req.query.name) dir = '';

  fs.readdir('./public/files/' + dir, function (err, files) {
    if (err) res.status(401).send({ error: err.message });
    else {
      let fileTypes = {
        files: [],
        dirs: []
      };
      files.forEach(function(file) {
        if (file.indexOf('.') === -1) fileTypes.dirs.push(file);
        else fileTypes.files.push(file);
      });

      res.status(201).send(fileTypes);
    }
  });
});

app.use((req, res) => res.sendFile(__dirname + '/public/index.html'));

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
