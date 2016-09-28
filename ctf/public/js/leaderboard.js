/*jslint esversion:6 */

function createTableRow(data, username) {
  let td = document.createElement('td');
  td.innerHTML = data;
  if (username === $('#profile_header').text()) td.style = 'font-weight:bold';
  return td;
}

function addChallengesToCompletedList(challenges) {
  challenges.forEach(function(challenge) {
    let tr = document.createElement('tr');

    tr.appendChild(createTableRow(challenge.username, challenge.username));
    tr.appendChild(createTableRow(challenge.challenge_name, challenge.username));
    tr.appendChild(createTableRow(challenge.points, challenge.username));
    tr.appendChild(createTableRow(unixTimeToRegular(challenge.time_completed), challenge.username));
    document.getElementById('challenges_completed').appendChild(tr);
  });
}

function addTeamsToList(teams) {
  teams.forEach(function(team) {
    let tr = document.createElement('tr');

    tr.appendChild(createTableRow(team.username, team.username));
    tr.appendChild(createTableRow(team.points, team.username));
    document.getElementById('leaderboard').appendChild(tr);
  });
}

function populateLeaderboard() {
  ajaxGet('/v1/leaderboard',
    addTeamsToList,
    () => {});

  ajaxGet('/v1/all_completed',
    addChallengesToCompletedList,
    () => {});
}
