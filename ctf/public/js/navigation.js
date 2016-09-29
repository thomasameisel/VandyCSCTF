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

function headerBold(name) {
  $('#navbar').find('a').css('font-weight', 'normal');
  document.getElementById(name + '_header').style = 'font-weight:bold';
}

function goToLogin() {
  headerBold('login');
  loadFile('login.html', () => {
    document.getElementById('login').onkeydown = function(event) {
      if (event.keyCode == 13) {
        submitLogin();
      }
    };
  });
}

function goToSignup() {
  headerBold('signup');
  loadFile('signup.html', () => {
    document.getElementById('login').onkeydown = function(event) {
      if (event.keyCode == 13) {
        submitSignup();
      }
    };
  });
}

function goToChallenges() {
  headerBold('challenges');
  loadFile('challenges.html', populateChallenges);
}

function goToLeaderboard() {
  headerBold('leaderboard');
  loadFile('leaderboard.html', populateLeaderboard);
}

function goToProfile() {
  headerBold('profile');
  loadFile('profile.html', populateProfile);
}

function goToAdmin() {
  headerBold('admin');
  ajaxGet('/v1/admin',
    (data) => loadHTML(data, populateAdminChallenges),
    (data) => loadHTML(data.responseText));
}
