/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let sqlite3 = require('sqlite3');

let db = new sqlite3.Database(__dirname + '/users.db');
let app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)', function(err) {
  db.run('INSERT OR IGNORE INTO users VALUES ("admin", "2SFwq")');
});

app.post('/v1/session', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must specify username and password' });
  } else {
    db.get('SELECT * FROM users WHERE username=? AND password=?', username, password,
      function(err, data) {
        if (err) res.status(400).send({ error: 'Error with database' });
        else if (!data) res.status(401).send({ error: 'Login is not correct' });
        else if (username !== 'admin') res.status(201).send({ msg: 'Must be admin to view flag' });
        else res.status(201).send({ msg: '_FLAG_(third_times_the_charm)' });
      });
  }
});

app.post('/v1/user', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must specify username and password' });
  } else if (password.length > 5) {
    res.status(401).send({ error: 'Password cannot be longer than 5 characters' });
  } else if (!password.match(/^[a-zA-Z0-9]+$/i)){
    res.status(401).send({ error: 'Password must be alphanumeric' });
  } else {
    db.get('SELECT * FROM users WHERE username="' + username + '"', function(err, data) {
      if (err) res.status(400).send({ error: err.message });
      else if (data) res.status(400).send({ error: 'Username already in use' });
      else {
        db.run('INSERT INTO users (username, password) VALUES (?,?)', username, password, function(err) {
          if (err) res.status(400).send({ error: err.message });
          else res.status(201).send({ msg: 'Signed up!' });
        });
      }
    });
  }
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
