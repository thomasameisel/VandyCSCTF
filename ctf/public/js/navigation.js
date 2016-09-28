/*jslint esversion:6 */

function loadFile(file, cb) {
  $('#content').empty();
  if (cb) $('#content').load(file, cb);
  else $('#content').load(file);
}

function loadHTML(file, cb) {
  $('#content').empty();
  $('#content').html(file);
  if (cb) cb();
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
  loadFile('challenges.html', populateChallenges);
}

function goToLeaderboard() {
  loadFile('leaderboard.html', populateLeaderboard);
}

function goToProfile() {
  loadFile('profile.html', populateProfile);
}

function goToAdmin() {
  ajaxGet('/v1/admin',
    (data) => loadHTML(data, populateAdminChallenges),
    (data) => loadHTML(data.responseText));
}
