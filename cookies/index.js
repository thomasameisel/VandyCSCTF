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

app.post('/v1/session', function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});
