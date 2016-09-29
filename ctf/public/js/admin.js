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
  $('#challenges').children('a').each(function() {
    this.style['font-weight'] = 'normal';
  });
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

function populateAdminChallenge(challenge_id) {
  ajaxGet('/v1/admin/challenge?challenge_id=' + challenge_id,
    addAdminChallengeToContent,
    () => {});
}

function populateAdminChallenges() {
  ajaxGet('/v1/admin/challenges',
    (data) => addChallengesToList(data, populateAdminChallenge),
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
