/*jslint esversion:6 */

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
    addChallengesToCompleted,
    () => {});
}
