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

app.post('/v1/session', function(req, res) {
  let userAgent = req.body.user_agent;
  if (!userAgent) {
    res.status(400).send({ error: 'Must specify user agent' });
  } else if (userAgent !== 'VandyCS') {
    res.status(401).send({ error: 'Must access from VandyCS browser' });
  } else {
    res.status(201).send({ flag: '_FLAG_(agents_for_users)' });
  }
});

let server = app.listen(8086, function () {
    console.log('Example app listening on ' + server.address().port);
});
