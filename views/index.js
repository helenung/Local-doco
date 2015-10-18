(function() {

  $(function() {
    $('#login').click(function() {
      console.log('clicked');
      login();
    });
  });

  function login() {
    var ref = new Firebase("https://local-doco.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("User data:", authData);
      }
    });
  };
})();
