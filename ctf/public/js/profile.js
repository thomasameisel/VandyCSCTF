/*jslint esversion:6 */

function populateProfile() {
  ajaxGet('/v1/completed?username=' + $('#profile_header').text(),
    (data) => addChallengesToCompleted(data.completed),
    () => {});
}
