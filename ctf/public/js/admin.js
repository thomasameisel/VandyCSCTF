/*jslint esversion:6 */

function changeAdminResponse(msg) {
  $('#admin_response').text(msg);
}

function showAddChallenge() {
  $('#challenge_name').val('');
  $('#challenge_id').val('');
  $('#challenge_content').val('');
  $('#points').val('');
  $('#flag').val('');
  $('#admin_response').text('');
  $('#challenge_remove').hide();

  $('#add_edit_challenge').text('Add Challenge');
  $('#challenge_update').text('Add challenge');
  $('#challenge_update').attr('onclick', 'addChallenge()');
}

function addAdminChallengeToContent(challenge) {
  $('#challenge_name').val(challenge.challenge_name);
  $('#challenge_id').val(challenge.challenge_id);
  $('#challenge_content').val(challenge.challenge_content);
  $('#points').val(challenge.points);
  $('#flag').val(challenge.flag);
  $('#admin_response').text('');
  $('#challenge_remove').show();

  $('#add_edit_challenge').text('Edit Challenge');
  $('#challenge_update').text('Update challenge');
  $('#challenge_update').attr('onclick', 'editChallenge()');
}

function addAdminChallengesToList(challenges) {
  $('#challenges').empty();

  for (let i = 0; i < challenges.length; ++i) {
    let challenge = document.createElement('a');
    challenge.style = 'display:block';
    challenge.id = challenges[i].challenge_id;
    challenge.innerHTML = challenges[i].challenge_name + ' (' + challenges[i].points + ' points)';
    challenge.addEventListener('click', () => {
      populateAdminChallenge(challenges[i].challenge_id);
    });
    document.getElementById('challenges').appendChild(challenge);
  }
}

function populateAdminChallenge(challengeId) {
  ajaxGet('/v1/admin/challenge?challenge_id=' + challengeId,
    addAdminChallengeToContent,
    () => {});
}

function populateAdminChallenges() {
  ajaxGet('/v1/admin/challenges',
    addAdminChallengesToList,
    () => {});
}

function updateChallenge(url, onSuccess) {
  let challenge = inputToJSON();
  challenge.challenge_content = $('#challenge_content').val();

  ajaxPost(url, challenge,
    (data) => {
      changeAdminResponse(data);
      if (onSuccess) onSuccess();
    },
    (data) => changeAdminResponse(JSON.parse(data.responseText).error));
}

function deleteChallenge() {
  updateChallenge('/v1/admin/delete_challenge', populateAdminChallenges);
}

function editChallenge() {
  updateChallenge('/v1/admin/edit_challenge');
}

function addChallenge() {
  updateChallenge('/v1/admin/add_challenge', () => {
    populateAdminChallenges();
    showAddChallenge();
  });
}
