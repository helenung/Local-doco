(function() {

    var huntId;
    var teamName;
    var db = new Firebase('https://local-doco.firebaseio.com');
    var points = 0;

    window.onload = function(){
        initState();
        // loadItems();
    }

    function initState(){
        var url = window.location.href.split("?");
        var params = url && url[1] ? url[1].split("=") : null;
        temp = params && params[1] ? params[1] : null;

        var urlVariables = temp.split(":qw:");
        huntId = urlVariables[0];
        teamName = urlVariables[1];
        console.log("Hunt Id: " + huntId + " // Team Name: " + teamName);
        db.child('hunts').child(huntId).child('items').once('value', function(snapshot) {
            var possibleItems = snapshot.val();

            db.child('hunts').child(huntId).child('teams').child(teamName).child('items').once('value', function(snapshot) {
                var itemStatus = snapshot.val();
                for (var i = 0; i < possibleItems.length; i++) {
                    //items.push(snapshot.val());
                    if(itemStatus[i]){
                        points++;
                    }
                    addItem(i,possibleItems[i],10,itemStatus[i]);
                }
                initListeners();
                $("#points").html(points * 10);
            });
        });
    }

    function initListeners(){
    	$(".feedItem").click(function(){
            var itemIndex = $(this).attr('id').split(":qw:");
    		var newLocation = location.href.split("itemList.html")[0] + "itemprofile.html?random=" + huntId + ":qw:" + teamName + 
            ":qw:" + itemIndex[0] + ":qw:" + itemIndex[1] + ":qw:" + itemIndex[2];

            location.href = newLocation;
        });

    	$("#leaderNav").click(function(){
    		location.href = location.href.replace('/itemList.html','') + "/leaderboard.html";
    	});
    }

    function addItem(id,name,score,earned){
        var imgLink;
        var baseDiv;
        
        if(earned){
            db.child('hunts').child(huntId).child('teams').child(teamName).child('pics').once('value', function(snapshot) {
                var possiblePics = snapshot.val();
                imgLink = possiblePics[id];
                baseDiv = '<div id="' + id + ":qw:" + name + ":qw:" + earned + '" class="feedItem" style="background: url(' + "'" + imgLink + "'" + ') no-repeat center center; background-size: cover;">' + '<h2>' + name + '</h2><span class="earned">+' + score + '</span></div>';
                $(".feed").append(baseDiv);
                initListeners();
            });
        } else {
            baseDiv = '<div id="' + id + ":qw:" + name + ":qw:" + earned + '" class="feedItem"><h2>' + name + '</h2><span>+' + score + '</span></div>';
            $(".feed").append(baseDiv);
        }
    }

})();











