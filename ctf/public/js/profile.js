/*jslint esversion:6 */

function unixTimeToRegular(unix_timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
