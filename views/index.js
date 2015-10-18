(function() {

  var db = new Firebase("https://local-doco.firebaseio.com");

  $(function() {
    $('#login').click(function() {
      console.log('clicked');
      login();
    });
  });

  function login() {
    db.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("User data:", authData);
      }
    });
  };
})();
