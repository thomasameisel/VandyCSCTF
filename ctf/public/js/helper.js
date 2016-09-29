/*jslint esversion:6 */

function createTableRow(data, username) {
  let td = '<td';
  if (username && username === $('#profile_header').text()) {
    td += ' style="font-weight:bold"';
  }
  td += '>' + data + '</td>';
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
  } else {
    let tmp = '';
    challenges.forEach(function(challenge) {
      tmp += '<tr>';
      if (challenge.username) tmp += createTableRow(challenge.username, challenge.username);
      tmp += createTableRow(challenge.challenge_name, challenge.username);
      tmp += createTableRow(challenge.points, challenge.username);
      tmp += createTableRow(unixTimeToRegular(challenge.time_completed), challenge.username);
      tmp += '</tr>';
    });
    $('#challenges_completed').append(tmp);
  }
}

function addChallengesToList(challenges, onclick) {
  $('#challenges').empty();

  let tmp = '';
  challenges.forEach(function(challenge) {
    tmp += '<a style="display:block" ';
    tmp += 'id="' + challenge.challenge_id + '" ';
    tmp += '>' + challenge.challenge_name + ' (' + challenge.points + ' points)</a>';
  });
  $('#challenges').append(tmp);
  
  $('#challenges').on('click', 'a', function() {
    $('#challenges').children('a').each(function() {
      this.style['font-weight'] = 'normal';
    });
    $(this).css('font-weight', 'bold');
    onclick($(this).attr('id'));
  });
}
