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
  admin: 'asWR2#$@sdbljQFASR123353'
};

app.post('/v1/session', function(req, res) {
  let userAgent = req.body.user_agent;
  if (!userAgent) {
    res.status(400).send({ error: 'Must specify user agent' });
  } else if (userAgent !== 'VandyCS') {
    res.status(401).send({ error: 'Must come from VandyCS' });
  } else {
    res.status(201).send({ flag: 'agents_for_users' });
  }
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
