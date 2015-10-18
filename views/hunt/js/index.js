(function() {
    console.log("hi");
    var db = new Firebase('https://local-doco.firebaseio.com');

    $( document ).ready(function() {
      // Handler for .ready() called.
      $( "#startButton" ).click(function() {
       	var url = window.location.href.split("?");
      	var params = url && url[1] ? url[1].split("=") : null;
      	huntId = params && params[1] ? params[1] : null;

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

        var newLocation = location.href.split("index.html")[0] + "itemList.html?random=" + huntId + ":qw:" + namae;

        setTimeout(function(){
          location.href = newLocation;
        },1000);

        // location.href = location.href.replace('/index.html','') + "/itemList.html";

    	});
    });
})();