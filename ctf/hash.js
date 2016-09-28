/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

var bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(password, cb) {
  bcrypt.hash(password, saltRounds, cb);
}

function checkPassword(password, hash, cb) {
  bcrypt.compare(password, hash, cb);
}

module.exports = {
  hashPassword: hashPassword,
  checkPassword: checkPassword
};
