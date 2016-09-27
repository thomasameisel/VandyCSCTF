/*jslint esversion:6 */

function loadFile(file) {
  $('#content').empty();
  $('#content').load(file);
}

function goToMain() {
  loadFile('main.html');
}

function goToLogin() {
  loadFile('login.html');
}

function goToSignup() {
  loadFile('signup.html');
}

function goToChallenges() {
  loadFile('challenges.html');
  populateChallenges();
}
