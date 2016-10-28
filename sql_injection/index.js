/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let sqlite3 = require('sqlite3');
let fs = require('fs');

let db = new sqlite3.Database(__dirname + '/users.db');
let app = express();
app.use(express.static('public'));
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)', function(err) {
  db.run('INSERT OR IGNORE INTO users VALUES ("admin", "sdlfwoi@#$#@sdf")');
});

app.post('/v1/session', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  db.all('SELECT * FROM users WHERE username="' + username + '" AND password="' + password + '"',
    function(err, rows) {
      if (err) res.status(400).send({ error: err.message });
      else if (rows.length === 0) {
        res.status(401).send({ error: 'Username and password are incorrect' });
      } else {
        res.status(201).send({ flag: '_FLAG_(sanitize_your_inputs)' });
      }
    });
});

let server = app.listen(8084, function () {
    console.log('Example app listening on ' + server.address().port);
});
