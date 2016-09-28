/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let sqlite3 = require('sqlite3');

let hash = require('./hash');

let db = new sqlite3.Database(__dirname + '/ctf.db');

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

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must provide username and password' });
  } else {
    db.get('SELECT users.username, users.hash, users.is_admin, total_points FROM users LEFT OUTER JOIN leaderboard ON users.username = leaderboard.username WHERE users.username=?', username,
      function(err, data) {
        if (err) res.status(400).send({ error: 'Error with database' });
        else if (!data) res.status(401).send({ error: 'Username and password are not correct' });
        else {
          hash.checkPassword(password, data.hash, (err, correct) => {
            if (err) res.status(400).send({ error: 'Error occurred' });
            else if (!correct) res.status(401).send({ error: 'Username and password are not correct' });
            else {
              req.session.username = username;
              req.session.admin = data.is_admin === 1;
              if (data.total_points === null) res.status(201).send({
                username: username,
                is_admin: req.session.admin
              });
              else res.status(201).send({
                username: username,
                is_admin: req.session.admin,
                points: data.total_points
              });
            }
          });
        }
      });
  }
}

function signup(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send({ error: 'Must provide username and password' });
  } else {
    hash.hashPassword(password, (err, hash) => {
      if (err) res.status(401).send({ error: 'Error occurred' });
      else {
        db.run('INSERT INTO users VALUES (?,?,0)', username, hash);
        req.session.username = username;
        req.session.admin = false;
        res.status(201).send({
          username: username,
          points: 0
        });
      }
    });
  }
}

function auth(req, res) {
  checkLoggedIn(req, res, () => {
    db.get('SELECT total_points FROM leaderboard WHERE username=?', req.session.username,
      function(err, data) {
        if (err) res.status(201).send({ username: req.session.username });
        else if (!data) res.status(201).send({
          username: req.session.username,
          is_admin: req.session.admin
        });
        else res.status(201).send({
          username: req.session.username,
          is_admin: req.session.admin,
          points: data.total_points
        });
      });
  });
}

function logout(req, res) {
  req.session.admin = false;
  req.session.username = undefined;
  res.status(201).send();
}

module.exports = {
  login: login,
  signup: signup,
  auth: auth,
  logout: logout,
  checkLoggedIn: checkLoggedIn,
  checkAdmin: checkAdmin
};
