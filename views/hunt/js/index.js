(function() {
    console.log("hi");
    var db = new Firebase('https://local-doco.firebaseio.com');

    var HUNTS = [];

    function setHuntHeader(name) {
      $("#huntName").html(name);
    }

    function getHuntName(id) {
      var name;
      db.child('hunts').child(id).once('value', function(snapshot) {
          var hunt = snapshot.val();
          setHuntHeader(hunt.name);
      });
      
    }

    

    $( document ).ready(function() {
      // Handler for .ready() called.
      var url = window.location.href.split("?");
      var params = url && url[1] ? url[1].split("=") : null;
      var huntId = params && params[1] ? params[1] : null;

      var huntName = getHuntName(huntId)
      console.log(huntName);

      $( "#startButton" ).click(function() {
       	

      	namae = $("#name").val();
      	console.log(huntId+ " "+ namae);
     		db.child("hunts").child(huntId).child("teams").child(namae).set({
          name: namae
        });

     		db.child('hunts').child(huntId).child('items').once('value', function(snapshot) {
  	      var items = snapshot.val();
          console.log("Items!" + items);

          var itemsObj = {};
          for(var i=0;i < items.length;i++){
            itemsObj[i] = false;
          }

          console.log(itemsObj);

          // for (var i = 0; i < items.length; i++) {
          //     //items.push(snapshot.val());
          //     console.log(items[i]);

              
          // }
          db.child("hunts").child(huntId).child("teams").child(namae).set({
               items: itemsObj
              });
  	    });

        var newLocation = location.href.split("hunt/")[0] + "hunt/itemList.html?random=" + huntId + ":qw:" + namae;

        setTimeout(function(){
          location.href = newLocation;
        },1000);

        // location.href = location.href.replace('/index.html','') + "/itemList.html";

    	});
    });
})();