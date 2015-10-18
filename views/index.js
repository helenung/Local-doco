(function() {

  var db = new Firebase('https://local-doco.firebaseio.com');

  var USER_ID = '';

  var HUNTS = [];

  $(function() {

    $("#huntsList").hide();
    $("#cssmenu").hide();
    $("#create").hide();
    $("#login").click(function() {
      console.log('clicked');
      login();
   });
  });

  function login() {
    db.authWithOAuthPopup('facebook', function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        $("#loginDiv").hide();
        console.log('User data:', authData);
        var id = authData.uid.substring(9);
        USER_ID = id;
        checkIfUserExists(id);
        getHunts(id);

        $(".signin").hide();
        $("#huntsList").show();
        $("#cssmenu").show();
        $("#create").show();
        $("#addItem").click(function() {
          console.log("Add new item");
          addItem();
        });
        $("#submitHunt").click(function() {
          console.log("Submit hunt");
          addHunt();
        });

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
      huntIds = snapshot.val();
      // Array of {id: id, items: [{name: 'abc', description: 'abcde'}]}
      var huntsRef = db.child('hunts');
      var itemsRef = db.child('items');
      for (var key in huntIds) {
        if (huntIds.hasOwnProperty(key)) {
          // Lookup the item ids from hunts table
          huntsRef.child(key).once('value', function(snapshot) {
            var itemIds = snapshot.val().items;
            var items = []
            for (var i = 0; i < itemIds.length; i++) {
              itemsRef.child(itemIds[i]).once('value', function(snapshot) {
                items.push(snapshot.val());
              });
            }
            HUNTS.push({
              id: key,
              items: items
            });
          });
        }
      }
    });
  }

  count = 1;

  function addItem() {
    count++;
    $("#dynamicInput").append($("<input>").attr("type", "text")
        .attr("placeholder", "Item " + count)
        .attr("class", "item").attr("size", "75"));
    console.log($(".item"));
  }

  function addHunt() {
    var huntName = $("#huntName").val();
    var desc = $("#desc").val();
    var items = $(".item");
    var itemNames = [];
    for (var i = 0; i < items.length; i++) {
      itemNames.push(items.eq(i).val());
    }
    var huntsRef = db.child('hunts').push();
    huntsRef.set({name: huntName, items: itemNames});
    debugger;
    db.child('users').child(USER_ID).child('hunts').child(huntsRef.key()).set({set: true});
  }

})();
