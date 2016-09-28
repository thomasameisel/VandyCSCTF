/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

let sqlite3 = require('sqlite3');

module.exports = {
  db: new sqlite3.Database(__dirname + '/ctf.db')
};
