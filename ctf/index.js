/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let fs = require('fs');
let session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
let sqlite3 = require('sqlite3');

let db = new sqlite3.Database(__dirname + '/ctf.db');

let app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  store: new SQLiteStore,
  secret: 'VandyCSCTFC0Mpetition'
}));

function checkLoggedIn(req, res, cb) {
  if (!req.session.username) {
    res.status(401).send({ error: 'Must be logged in' });
  } else if (cb) cb();
}

function checkAdmin(req, res, cb) {
  if (!req.session.admin) {
    res.status(401).send({ error: 'Not authorized' });
  } else if (cb) cb();
}

app.get('/v1/challenges', function(req, res) {
  checkLoggedIn(req, res, () => {
    // only return the challenges the user has not completed yet
    db.all('SELECT challenge_id, challenge_name, challenge_filename, points FROM not_completed WHERE username=?',
      req.session.username,
      function(err, data) {
        if (err) res.status(401).send({ error: 'Error with database' });
        else res.status(201).send(data);
      });
  });
});

app.get('/v1/challenge', function(req, res) {
  checkLoggedIn(req, res, () => {
    let challenge_id = req.query.challenge_id;
    if (!challenge_id) res.status(400).send({ error: 'Must provide challenge_id' });
    else {
      db.get('SELECT challenge_id, challenge_content FROM challenges WHERE challenge_id=?', challenge_id,
        function(err, data) {
          if (err) res.status(401).send({ error: 'Error with database' });
          else res.status(201).send(data);
        });
    }
  });
});

app.post('/v1/flag', function(req, res) {
  checkLoggedIn(req, res, () => {
    let challengeId = req.body.challenge_id;
    let flag = req.body.flag;
    if (!challengeId || !flag) {
      res.status(400).send({ error: 'Must provide challenge_id and flag' });
    } else {
      db.get('SELECT flag FROM challenges WHERE challenge_id=?', challengeId,
        function(err, data) {
          if (err) res.status(400).send({ error: 'Error with database' });
          else if (!data || !data.flag) res.status(401).send({ error: 'challenge_id is not valid' });
          else if (data.flag !== flag) res.status(401).send({ error: 'flag is not correct' });
          else {
            res.status(201).send({ msg: 'Correct answer!' });
            let unixTime = Math.floor(new Date() / 1000);
            db.run('INSERT OR IGNORE INTO completed (username, challenge_id, time_completed) ' +
              'VALUES (?,?,?)', req.session.username, challengeId, unixTime);
          }
        });
    }
  });
});

app.post('/v1/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must provide username and password' });
  } else {
    db.get('SELECT users.username, users.is_admin, total_points FROM users LEFT OUTER JOIN leaderboard ON users.username = leaderboard.username WHERE users.username=? AND password=?', username, password,
      function(err, data) {
        if (err) res.status(400).send({ error: 'Error with database' });
        else if (!data) res.status(401).send({ error: 'Username and password are incorrect' });
        else {
          console.log(data);
          req.session.username = username;
          req.session.admin = data.is_admin;
          if (data.total_points === null) res.status(201).send({ username: username });
          else res.status(201).send({
            username: username,
            points: data.total_points
          });
        }
      });
  }
});

app.post('/v1/signup', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must provide username and password' });
  } else {
    db.run('INSERT INTO users VALUES (?,?)', username, password);
    req.session.username = username;
    req.session.admin = false;
    res.status(201).send({
      username: username,
      points: 0
    });
  }
});

app.get('/v1/auth', function(req, res) {
  checkLoggedIn(req, res, () => {
    db.get('SELECT total_points FROM leaderboard WHERE username=?', req.session.username,
      function(err, data) {
        if (err) res.status(201).send({ username: req.session.username });
        else if (!data) res.status(201).send({ username: req.session.username });
        else res.status(201).send({
          username: req.session.username,
          points: data.total_points
        });
      });
  });
});

app.get('/v1/logout', function(req, res) {
  req.session.admin = false;
  req.session.username = undefined;
  res.status(201).send();
});

app.get('/v1/leaderboard', function(req, res) {
  db.all('SELECT username, total_points AS points FROM leaderboard ORDER BY total_points DESC', function(err, data) {
    if (err) res.status(401).send({ error: 'Error with database' });
    else res.status(201).send(data);
  });
});

app.get('/v1/points', function(req, res) {
  let username = req.query.username;
  if (!username) res.status(400).send({ error: 'Must provide username' });
  else {
    db.get('SELECT total_points FROM leaderboard WHERE username=?', username,
      function(err, data) {
        if (err) res.status(401).send({ error: 'Error with database' });
        else res.status(201).send({
          username: username,
          points: data.total_points
        });
      });
  }
});

app.get('/v1/admin', function(req, res) {
  checkAdmin(req, res, () => {
    fs.readFile('admin.html', function(err, data) {
      if (err) res.status(401).send('Error occurred');
      else res.status(201).send(data);
    });
  });
});

app.get('/v1/admin/challenge', function(req, res) {
  checkAdmin(req, res, () => {
    let challenge_id = req.query.challenge_id;
    if (!challenge_id) res.status(400).send({ error: 'Must provide challenge_id' });
    else {
      db.get('SELECT challenge_id, challenge_name, challenge_content, points, flag FROM challenges WHERE challenge_id=?', challenge_id,
        function(err, data) {
          if (err) res.status(401).send({ error: 'Error with database' });
          else res.status(201).send(data);
        });
    }
  });
});

app.post('/v1/admin/add_challenge', function(req, res) {
  checkAdmin(req, res, () => {
    let challenge_id = req.body.challenge_id;
    let challenge_name = req.body.challenge_name;
    let points = req.body.points;
    let flag = req.body.flag;
    let challenge_content = req.body.challenge_content;
    if (!challenge_id || !challenge_name || !points || !flag || !challenge_content) {
      res.status(401).send({ error: 'Must provide all information' });
    } else {
      db.run('INSERT INTO challenges (challenge_id,challenge_name,challenge_filename,points,flag,challenge_content)' +
        ' VALUES (?,?,"",?,?,?)', challenge_id, challenge_name, points, flag, challenge_content);
      res.status(201).send('Challenge added');
    }
  });
});

app.post('/v1/admin/edit_challenge', function(req, res) {
  checkAdmin(req, res, () => {
    let challenge_id = req.body.challenge_id;
    let challenge_name = req.body.challenge_name;
    let points = req.body.points;
    let flag = req.body.flag;
    let challenge_content = req.body.challenge_content;
    if (!challenge_id || !challenge_name || !points || !flag || !challenge_content) {
      res.status(401).send({ error: 'Must provide all information' });
    } else {
      db.run('UPDATE challenges SET challenge_name=?, points=?, flag=?, challenge_content=?' +
        ' WHERE challenge_id=?', challenge_name, points, flag, challenge_content, challenge_id);
      res.status(201).send('Challenge updated');
    }
  });
});

app.post('/v1/admin/delete_challenge', function(req, res) {
  checkAdmin(req, res, () => {
    let challenge_id = req.body.challenge_id;
    if (!challenge_id) res.status(401).send({ error: 'Must provide challenge_id' });
    else {
      db.run('DELETE FROM challenges WHERE challenge_id=?', challenge_id);
      res.status(201).send('Challenge deleted');
    }
  });
});

let server = app.listen(8080, function() {
  console.log('CTF server listening on ' + server.address().port);
});
