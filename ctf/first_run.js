/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let sqlite3 = require('sqlite3');
let prompt = require('prompt');

let hash = require('./hash');

let db = new sqlite3.Database(__dirname + '/ctf2.db');
db.run('CREATE TABLE IF NOT EXISTS users (username text, hash text, is_admin boolean)');
db.run('CREATE TABLE IF NOT EXISTS completed (username text, challenge_id int, time_completed int)');
db.run('CREATE TABLE IF NOT EXISTS challenges (challenge_name text, points int, flag text, challenge_content text)');
db.run('CREATE VIEW IF NOT EXISTS leaderboard AS SELECT users.username, COALESCE(sum(points), 0) AS total_points FROM users LEFT OUTER JOIN (challenges JOIN completed ON challenges.ROWID=completed.challenge_id) ON users.username=completed.username WHERE users.is_admin=0 GROUP BY users.username');
db.run('CREATE VIEW IF NOT EXISTS not_completed AS SELECT users.username, challenges.rowid AS challenge_id, challenges.challenge_name, challenges.points FROM users, challenges WHERE challenges.rowid NOT IN (SELECT challenge_id FROM completed WHERE completed.username=users.username) AND users.is_admin=0');

prompt.message = undefined;
prompt.colors = false;

let properties = [
  {
    name: 'add_admin',
    description: 'Add admin account (Y/N)'
  }
];

function adminExists(cb) {
  db.get('SELECT * FROM users WHERE is_admin=1', (err, data) => {
    if (err) cb(err);
    else cb(undefined, data !== undefined);
  });
}

function firstRun() {
  adminExists((err, exists) => {
    if (err || !exists) {
      prompt.start();
      prompt.get(properties, (err, result) => {
        if (result.add_admin === 'Y' || result.add_admin === 'y') {
          prompt.get(['Username', {name: 'Password', hidden:true}], (err, result) => {
            let username = result.Username;
            let password = result.Password;
            hash.hashPassword(password, (err, hash) => {
              if (err) console.log('Error occured');
              else {
                db.run('INSERT INTO users (username, hash, is_admin) VALUES (?,?,1)', username, hash);
                console.log('admin account added:', username);
              }
            });
          });
        }
      });
    }
  });
}

module.exports = {
  firstRun: firstRun
};
