/*jslint esversion:6 */

function setHeaderButtonsVisibility(loggedIn) {
  let loggedInBtns = [
    'challenges_header', 'logout_header', 'profile_header'
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

function populateHeaderLoggedIn(data, redirectToChallenges) {
  setHeaderButtonsVisibility(true);
  $('#profile_header').text(data.username);
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
