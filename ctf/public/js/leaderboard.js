/*jslint esversion:6 */

function addChallengesToCompletedList(challenges) {
  challenges.forEach(function(challenge) {
    console.log(challenge);
    let tr = document.createElement('tr');
    let teamNameTd = document.createElement('td');
    teamNameTd.innerHTML = challenge.username;
    tr.appendChild(teamNameTd);
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

function addTeamsToList(teams) {
  teams.forEach(function(team) {
    let tr = document.createElement('tr');
    let teamTd = document.createElement('td');
    teamTd.innerHTML = team.username;
    tr.appendChild(teamTd);
    let pointsTd = document.createElement('td');
    pointsTd.innerHTML = team.points;
    tr.appendChild(pointsTd);
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
