/*jslint esversion: 6 */

function changeResponse(msg) {
  $('#response').text(msg);
}

function addChallengeToContent(challenge) {
  $('#challenge').empty();
  $('#submit').show();

  let challengeDiv = document.getElementById('challenge');
  let challengeContent = challenge.challenge_content;
  let lines = challengeContent.split("\n");
  lines.forEach(function(line) {
    if (line.length === 0) challengeDiv.innerHTML += '<br />';
    else challengeDiv.innerHTML += '<p>' + line + '</p>';
  });
  $('#challenge_id').val(challenge.challenge_id);
}

function addChallengesToChallengesList(challenges) {
  $('#challenges').empty();

  if (challenges.length === 0) {
    let allDone = document.createElement('p');
    allDone.innerHTML = 'All done!';
    document.getElementById('challenges').appendChild(allDone);
  } else {
    addChallengesToList(challenges, populateChallenge);
  }
}

function populateChallenge(challengeId) {
  ajaxGet('/v1/challenge?challenge_id=' + challengeId,
    addChallengeToContent,
    () => {});
}

function populateChallenges() {
  ajaxGet('/v1/challenges',
    addChallengesToChallengesList,
    () => {});
}

function submitFlag() {
  let inputs = inputToJSON();
  if (inputs.flag && inputs.flag.length > 0) {
    ajaxPost('/v1/flag', inputs,
      (data) => {
        changeResponse(data.msg);
        populateChallenges();
        updatePoints();
      },
      (data) => changeResponse(JSON.parse(data.responseText).error));
  } else {
    changeResponse('Must supply challenge_id and flag');
  }
}
