/*jslint esversion:6 */

function setHeaderButtonsVisibility(loggedIn) {
  let loggedInBtns = [
    'challenges_header', 'logout_header', 'profile_header', 'points_header'
  ];
  let loggedOutBtns = [
    'login_header', 'signup_header'
  ];
  if (loggedIn) {
    loggedInBtns.forEach((id) => $('#' + id).show());
    loggedOutBtns.forEach((id) => $('#' + id).hide());
  } else {
    loggedOutBtns.forEach((id) => $('#' + id).show());
    loggedInBtns.forEach((id) => $('#' + id).hide());
  }
}

function updateUsernamePoints(data) {
  $('#profile_header').text(data.username);
  $('#points_header').text(data.points);
}

function populateHeaderLoggedIn(data, redirectToChallenges) {
  setHeaderButtonsVisibility(true);
  updateUsernamePoints(data);
  if (redirectToChallenges) goToChallenges();
}

function populateHeaderLoggedOut() {
  setHeaderButtonsVisibility(false);
}

function changeHeader() {
  ajaxGet('/v1/auth',
    (data) => populateHeaderLoggedIn(data, false),
    populateHeaderLoggedOut);
}

function updatePoints() {
  ajaxGet('/v1/points?username=' + $('#profile_header').text(),
    updateUsernamePoints,
    () => {});
}
