/*jslint esversion:6 */

function unixTimeToRegular(unix_timestamp) {
  return new Date(unix_timestamp*1000).toLocaleTimeString();
}

function createTableRow(data) {
  let td = document.createElement('td');
  td.innerHTML = data;
  return td;
}

function addChallengesToCompleted(data) {
  let challenges = data.completed;

  challenges.forEach(function(challenge) {
    let tr = document.createElement('tr');

    tr.appendChild(createTableRow(challenge.challenge_name));
    tr.appendChild(createTableRow(challenge.points));
    tr.appendChild(createTableRow(unixTimeToRegular(challenge.time_completed)));
    document.getElementById('challenges_completed').appendChild(tr);
  });
}

function populateProfile() {
  ajaxGet('/v1/completed?username=' + $('#profile_header').text(),
    addChallengesToCompleted,
    () => {});
}
