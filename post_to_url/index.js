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

let users = {
  admin: 'qwerljasf!#$@#%13asl!ASFDBA'
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

app.get('/v1/flag', function(req, res) {
  res.status(201).send({ flag: '_FLAG_(post_to_me)' });
});

let server = app.listen(8085, function () {
    console.log('Example app listening on ' + server.address().port);
});
