/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let fs = require('fs');
let session = require('express-session');
let sqlite3 = require('sqlite3');

let db = new sqlite3.Database(__dirname + '/users.db');

let app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'VandyCSCTFC0Mpetition'
}));

let challengeDir = './challenges/';

let flags = {
  1: 'flag1',
  2: 'flag2'
};

app.get('/v1/challenges', function(req, res) {
  fs.readdir(challengeDir, function(err, data) {
    if (err) res.status(401).send({ error: err.message });
    else {
      let challenges = [];
      for (let i = 0; i < data.length; ++i) {
        challenges.push({
          name: 'Challenge ' + (i+1),
          file: data[i]
        });
      }
      res.status(201).send(challenges);
    }
  });
});

app.get('/v1/challenge', function(req, res) {
  let name = req.query.name;
  if (!name) res.status(400).send({ error: 'Must specify challenge name' });
  else {
    fs.readFile(challengeDir + name, function(err, data) {
      if (err) res.status(401).send({ error: err.message });
      else res.status(201).send(data);
    });
  }
});

app.post('/v1/flag', function(req, res) {
  let challengeId = req.body.challenge_id;
  let flag = req.body.flag;
  if (!req.session.auth || !req.session.username) {
    res.status(400).send({ error: 'Not logged in' });
  } else if (!challengeId || !flag) {
    res.status(400).send({ error: 'Must supply challenge_id and flag' });
  } else if (!flags[challengeId]) {
    res.status(401).send({ error: 'challenge_id is not valid' });
  } else if (flags[challengeId] !== flag) {
    res.status(401).send({ error: 'flag is not valid' });
  } else {
    res.status(201).send({ msg: 'Correct answer!' });
  }
});

app.post('/v1/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must provide username and password' });
  } else {
    db.all('SELECT * FROM users WHERE username=? AND password=?', username, password,
      function(err, rows) {
        if (err) res.status(400).send({ error: 'Error with database' });
        else if (rows.length === 0) {
          res.status(401).send({ error: 'Username and password are incorrect' });
        } else {
          req.session.username = username;
          req.session.auth = true;
          res.status(201).send({ username: username });
        }
      });
  }
});

app.post('/v1/signup', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must provide username and password' });
  } else {
    db.run('INSERT INTO users VALUES (?, ?, 0)', username, password);
    req.session.username = username;
    req.session.auth = true;
    res.status(201).send({ username: username });
  }
});

app.get('/v1/auth', function(req, res) {
  if (!req.session.auth || !req.session.username) {
    res.status(401).send({ error: 'Not logged in' });
  } else {
    res.status(201).send({ username: req.session.username });
  }
});

app.get('/v1/logout', function(req, res) {
  req.session.auth = false;
  req.session.username = undefined;
  res.status(201).send();
});

let server = app.listen(8080, function () {
  console.log('Example app listening on ' + server.address().port);
});
