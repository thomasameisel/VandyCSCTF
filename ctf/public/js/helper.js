/*jslint esversion:6 */

function createTableRow(data, username) {
  let td = document.createElement('td');
  td.innerHTML = data;
  if (username && username === $('#profile_header').text()) {
    td.style['font-weight'] = 'bold';
  }
  return td;
}

function unixTimeToRegular(unix_timestamp) {
  return new Date(unix_timestamp*1000).toLocaleTimeString();
}

function addChallengesToCompleted(challenges) {
  if (challenges.length === 0) {
    let noneYet = document.createElement('p');
    noneYet.innerHTML = 'None yet!';
    document.getElementById('challenges_completed').appendChild(noneYet);
  }
  challenges.forEach(function(challenge) {
    let tr = document.createElement('tr');

    if (challenge.username) tr.appendChild(createTableRow(challenge.username, challenge.username));
    tr.appendChild(createTableRow(challenge.challenge_name, challenge.username));
    tr.appendChild(createTableRow(challenge.points, challenge.username));
    tr.appendChild(createTableRow(unixTimeToRegular(challenge.time_completed, challenge.username)));
    document.getElementById('challenges_completed').appendChild(tr);
  });
}

function addChallengesToList(challenges, onclick) {
  $('#challenges').empty();

  challenges.forEach(function(challenge) {
    let challengeEl = document.createElement('a');
    challengeEl.style.display = 'block';
    challengeEl.id = challenge.challenge_id;
    challengeEl.innerHTML = challenge.challenge_name + ' (' + challenge.points + ' points)';
    challengeEl.addEventListener('click', () => {
      $('#challenges').children('a').each(function() {
        this.style['font-weight'] = 'normal';
      });
      challengeEl.style['font-weight'] = 'bold';
      onclick(challenge.challenge_id);
    });
    document.getElementById('challenges').appendChild(challengeEl);
  });
}
