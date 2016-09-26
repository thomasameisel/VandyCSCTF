/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let sqlite3 = require('sqlite3');
let child_process = require('child_process');

let db = new sqlite3.Database(__dirname + '/users.db');
let app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/v1/session', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  db.all('SELECT * FROM users WHERE username="' + username + '" AND password="' + password + '"',
    function(err, rows) {
      if (err) res.status(400).send({ error: 'Error with database' });
      else if (rows.length === 0) {
        res.status(401).send({ error: 'Username and password are incorrect' });
      } else {
        res.status(201).send({ flag: 'sanitize_your_inputs' });
      }
    });
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
