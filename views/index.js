(function() {

  var db = new Firebase('https://local-doco.firebaseio.com');

  var USER_ID = '';

  $(function() {
    $('#login').click(function() {
      console.log('clicked');
      login();
    });
  });

  function login() {
    db.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('User data:', authData);
        var id = authData.uid.substring(9);
        USER_ID = id;
        checkIfUserExists(id);
        addHunt([{
          name: 'apple',
          description: 'a fucking apple'
        }]);
        getHunts(id);
      }
    });
  };
  function userExistsCallback(userId, exists) {
    if (exists) {
    } else {
      var usersRef = db.child('users');
      usersRef.child(userId).set({
        score: 0
      });
    }
    USER_ID = userId;
  }

  // Tests to see if /users/<userId> has any data.
  function checkIfUserExists(userId) {
    db.child('users').child(userId).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      userExistsCallback(userId, exists);
    });
  }

  function getHunts(userId) {
    db.child('users').child(userId).child('hunts').once('value', function(snapshot) {
      console.log(snapshot.val());
    });
  }

  // Store huntid: [itemids...] and itemid: {name: 'abc', description: 'abcde'}
  // items should be array of {name: 'abc', description: 'abcde'}
  function addHunt(items) {
    var itemsRef = db.child('items');
    var itemIds = [];
    for (var i = 0; i < items.length; i++) {
      var newItemRef = itemsRef.push();
      newItemRef.set(items[i]);
      itemIds.push(newItemRef.key());
    }
    var huntsRef = db.child('hunts').push();
    huntsRef.set({items: itemIds});
    db.child('users').child(USER_ID).child('hunts').push({id: huntsRef.key()});
  }

})();
