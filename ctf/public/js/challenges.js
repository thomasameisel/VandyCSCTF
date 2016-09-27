/*jslint esversion: 6 */

function changeResponse(msg) {
  $('#response').text(msg);
}

function addChallengeToView(challenge) {
  $('#challenge').empty();

  let challengeDiv = document.getElementById('challenge');
  challengeDiv.innerHTML = challenge;
  challengeDiv.innerHTML +=
    '<form>\n' +
      '<input type="text" id="flag" />\n' +
      '<input type="text" id="challenge_id" value="' + $('#id').text() + '" hidden />\n' +
      '<button type="button" onclick="submitFlag()">Submit</button>\n' +
    '</form>\n' +
    '<h5 id="response"></h5>\n';
}

function addChallengesToView(challenges) {
  for (let i = 0; i < challenges.length; ++i) {
    let challenge = document.createElement('a');
    challenge.style = 'display:block';
    challenge.id = challenges[i].file;
    challenge.innerHTML = challenges[i].name;
    challenge.addEventListener('click', () => {
      populateChallenge(challenges[i].file);
    });
    document.getElementById('challenges').appendChild(challenge);
  }
}

function populateChallenge(file) {
  ajaxGet('/v1/challenge?name=' + file,
    addChallengeToView,
    () => {});
}

function populateChallenges() {
  ajaxGet('/v1/challenges',
    addChallengesToView,
    () => {});
}

function submitFlag() {
  let inputs = inputToJSON();
  if (inputs.flag && inputs.flag.length > 0) {
    ajaxPost('/v1/flag', inputs,
      (data) => changeResponse(data.msg),
      (data) => changeResponse(JSON.parse(data.responseText).error));
  } else {
    console.log(inputs);
    changeResponse('Must supply challenge_id and flag');
  }
}
