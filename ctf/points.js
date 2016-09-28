/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let sqlite3 = require('sqlite3');

let db = new sqlite3.Database(__dirname + '/ctf.db');

function getLeaderboard(req, res) {
  db.all('SELECT username, total_points AS points FROM leaderboard ORDER BY total_points DESC', function(err, data) {
    if (err) res.status(401).send({ error: 'Error with database' });
    else res.status(201).send(data);
  });
}

function getPoints(req, res) {
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
}

module.exports = {
  getLeaderboard: getLeaderboard,
  getPoints: getPoints
};
