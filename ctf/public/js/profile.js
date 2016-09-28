/*jslint esversion:6 */

function unixTimeToRegular(unix_timestamp) {
  return new Date(unix_timestamp*1000).toLocaleTimeString();
}

function addChallengesToCompleted(data) {
  let challenges = data.completed;

  challenges.forEach(function(challenge) {
    let tr = document.createElement('tr');
    let challengeNameTd = document.createElement('td');
    challengeNameTd.innerHTML = challenge.challenge_name;
    tr.appendChild(challengeNameTd);
    let challengePointsTd = document.createElement('td');
    challengePointsTd.innerHTML = challenge.points;
    tr.appendChild(challengePointsTd);
    let challengeTimeTd = document.createElement('td');
    challengeTimeTd.innerHTML = unixTimeToRegular(challenge.time_completed);
    tr.appendChild(challengeTimeTd);
    document.getElementById('challenges_completed').appendChild(tr);
  });
}

function populateProfile() {
  ajaxGet('/v1/completed?username=' + $('#profile_header').text(),
    addChallengesToCompleted,
    () => {});
}
