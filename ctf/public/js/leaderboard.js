/*jslint esversion:6 */

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
}
