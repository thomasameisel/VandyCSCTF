/*jslint esversion:6 */

function loadFile(file, cb) {
  $('#content').empty();
  if (cb) $('#content').load(file, cb);
  else $('#content').load(file);
}

function headerBold(name) {
  $('#navbar').find('a').css('font-weight', 'normal');
  document.getElementById(name + '_header').style['font-weight'] = 'bold';
}

function goToMain() {
  $('#navbar').find('a').css('font-weight', 'normal');
  loadFile('main.html');
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
  loadFile('admin.html', populateAdminChallenges);
}
