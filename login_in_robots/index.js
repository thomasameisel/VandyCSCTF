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
  BWayne: 'ASEWer@#$21',
  HRen: '@#$1gABAsd',
  ABCd: 'pwd'
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
    res.status(201).send({ flag: '_FLAG_(accept_robot_overlords)' });
  }
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
