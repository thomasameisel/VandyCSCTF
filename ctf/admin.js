/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let fs = require('fs');

let checkAdmin = require('./auth.js').checkAdmin;

let db = require('./db').db;

function getAdmin(req, res) {
  checkAdmin(req, res, () => {
    fs.readFile('admin.html', function(err, data) {
      if (err) res.status(401).send('Error occurred');
      else res.status(201).send(data);
    });
  });
}

function getChallenges(req, res) {
  checkAdmin(req, res, () => {
    db.all('SELECT rowid AS challenge_id, challenge_name, points FROM challenges',
      function(err, data) {
        if (err) res.status(401).send({ error: 'Error with database' });
        else res.status(201).send(data);
      });
  });
}

function getChallenge(req, res) {
  checkAdmin(req, res, () => {
    let challenge_id = req.query.challenge_id;
    if (!challenge_id) res.status(400).send({ error: 'Must provide challenge_id' });
    else {
      db.get('SELECT rowid AS challenge_id, challenge_name, challenge_content, points, flag FROM challenges WHERE rowid=?', challenge_id,
        function(err, data) {
          if (err) res.status(401).send({ error: 'Error with database' });
          else res.status(201).send(data);
        });
    }
  });
}

function addChallenge(req, res) {
  checkAdmin(req, res, () => {
    let challenge_name = req.body.challenge_name;
    let points = req.body.points;
    let flag = req.body.flag;
    let challenge_content = req.body.challenge_content;
    if (!challenge_name || !points || !flag || !challenge_content) {
      res.status(401).send({ error: 'Must provide all information' });
    } else {
      db.run('INSERT INTO challenges (challenge_name,points,flag,challenge_content)' +
        ' VALUES (?,?,?,?)', challenge_name, points, flag, challenge_content);
      res.status(201).send('Challenge added');
    }
  });
}

function editChallenge(req, res) {
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
        ' WHERE rowid=?', challenge_name, points, flag, challenge_content, challenge_id);
      res.status(201).send('Challenge updated');
    }
  });
}

function deleteChallenge(req, res) {
  checkAdmin(req, res, () => {
    let challenge_id = req.body.challenge_id;
    if (!challenge_id) res.status(401).send({ error: 'Must provide challenge_id' });
    else {
      db.run('DELETE FROM challenges WHERE rowid=?', challenge_id);
      res.status(201).send('Challenge deleted');
    }
  });
}

module.exports = {
  getAdmin: getAdmin,
  getChallenges: getChallenges,
  getChallenge: getChallenge,
  addChallenge: addChallenge,
  editChallenge: editChallenge,
  deleteChallenge: deleteChallenge
};
