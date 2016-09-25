/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let fs = require('fs');
let child_process = require('child_process');

let app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/v1/view', function(req, res) {
  child_process.exec('cat ./files/' + req.body.name, function (err, data) {
    if (err) res.status(401).send({ error: err.message });
    else res.status(201).send({ contents: data });
  });
});

app.post('/v1/file', function(req, res) {
  fs.writeFile('./files/' + req.body.name, req.body.contents, function(err) {
    if (err) res.status(401).send({ error: err.message });
    else res.status(201).send();
  });
});

app.post('/v1/files', function(req, res) {
  fs.readdir('./files', function (err, files) {
    if (err) res.status(401).send({ error: err.message });
    else res.status(201).send({ files: files });
  });
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
