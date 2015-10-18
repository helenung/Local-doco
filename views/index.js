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
        var id = authData.uid.substring(9);

        checkIfUserExists(id);
        
      }
    });
  };
function userExistsCallback(userId, exists) {
  if (exists) {
    alert('user ' + userId + ' exists!');
  } else {
    alert('user ' + userId + ' does not exist!');
    var usersRef = db.child("users");
        
        usersRef.child(userId).set({
          id:userId
        });
  }
}

// Tests to see if /users/<userId> has any data. 
function checkIfUserExists(userId) {
  db.child('users').child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}

})();
