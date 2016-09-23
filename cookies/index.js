/*jslint node: true */
/*jslint esversion: 6 */
"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');

let app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

let users = {
  admin: 'weroidgl3@#$234lakdf@$#'
};

app.post('/v1/session', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must specify username and password' });
  } else if (!users[username]) {
    res.status(401).send({ error: 'Username not found' });
  } else if (users[username] !== password) {
    res.status(401).send({ error: 'Username and password are incorrect' });
  } else {
    res.status(201).send({ username: username });
  }
});

app.post('/v1/user', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must specify username and password' });
  } else if (users[username]) {
    res.status(400).send({ error: 'Username already in use' });
  } else {
    users[username] = password;
    res.status(201).send({ msg: 'Signed up!' });
  }
});

app.get('/v1/user/:username', function(req, res) {
  let username = req.params.username;
  if (username !== 'admin') {
    res.status(401).send({ error: 'Must be admin to view flag' });
  } else {
    res.status(201).send({ msg: 'i_like_cookies' });
  }
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
