/*jslint esversion: 6 */

function displayError() {
  $('#invalid-msg').css('display', 'inline');
}

function changeError(msg) {
  displayError();
  let responseText = JSON.parse(msg.responseText);
  $('#invalid-msg').text(responseText.error);
  return false;
}

function afterAuth(data) {
  populateHeaderLoggedIn(data, true);
}

function afterLogout() {
  populateHeaderLoggedOut();
  goToMain();
}

function logout() {
  ajaxGet('/v1/logout',
    afterLogout,
    afterLogout);
}

function submitLogin() {
  let info = inputToJSON('login');

  ajaxPost('/v1/login', info,
    afterAuth,
    changeError);
}

function submitSignup() {
  let info = inputToJSON('signup');
  info.non_competing = $('#non_competing').is(':checked');

  ajaxPost('/v1/signup', info,
    afterAuth,
    changeError);
}
