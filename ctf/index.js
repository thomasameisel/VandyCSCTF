/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

let admin = require('./admin');
let auth = require('./auth');
let challenges = require('./challenges');
let points = require('./points');

require('./first_run').firstRun();

let app = express();
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  store: new SQLiteStore,
  secret: 'VandyCSCTFC0Mpetition',
  resave: false,
  saveUninitialized: false
}));

app.get('/v1/challenges', challenges.getChallenges);

app.get('/v1/challenge', challenges.getChallenge);

app.post('/v1/flag', challenges.submitFlag);

app.get('/v1/completed', challenges.getCompleted);

app.get('/v1/all_completed', challenges.getAllCompleted);

app.post('/v1/login', auth.login);

app.post('/v1/signup', auth.signup);

app.get('/v1/auth', auth.auth);

app.get('/v1/logout', auth.logout);

app.get('/v1/leaderboard', points.getLeaderboard);

app.get('/v1/points', points.getPoints);

app.get('/v1/admin', admin.getAdmin);

app.get('/v1/admin/challenges', admin.getChallenges);

app.get('/v1/admin/challenge', admin.getChallenge);

app.post('/v1/admin/add_challenge', admin.addChallenge);

app.post('/v1/admin/edit_challenge', admin.editChallenge);

app.post('/v1/admin/delete_challenge', admin.deleteChallenge);

let server = app.listen(8080, function() {
  console.log('CTF server listening on ' + server.address().port);
});
