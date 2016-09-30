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

app.post('/v1/user', function(req, res) {
  console.log(req.body);
  if (!req.body.is_admin) {
    res.status(201).send('Must be admin to view flag');
  } else {
    res.status(201).send('_FLAG_(hide_and_go_seek)');
  }
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
