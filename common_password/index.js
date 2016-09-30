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
  admin: 'password'
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
    if (username === 'admin') {
      res.status(201).send({ flag: '_FLAG_(hunter2_in_stars)' });
    } else {
      res.status(201).send({ flag: 'Must be admin to view flag' });
    }
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

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
