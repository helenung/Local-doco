'use strict';

(function() {
  $(function() {
    console.log('what');
    $('#login').click(function() {
      console.log('clicked');
      login();
    });
  });

  $('#login').click(function() {
    console.log('clicked');
    login();
  });

  function login() {
    var ref = new Firebase("https://local-doco.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        window.location = '/dashboard';
      }
    });
  };
});
