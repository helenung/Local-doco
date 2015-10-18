(function() {

	var huntId;
	var teamName;
	var itemIndex;
	var itemName;
	var earned;
	var db = new Firebase('https://local-doco.firebaseio.com');

    window.onload = function(){
    	initState();
    	initListeners();
    }

    function initState(){
        var url = window.location.href.split("?");
        var params = url && url[1] ? url[1].split("=") : null;
        temp = params && params[1] ? params[1] : null;

        var urlVariables = temp.split(":qw:");
        huntId = urlVariables[0];
        teamName = urlVariables[1];
        itemIndex = urlVariables[2];
        itemName = urlVariables[3];
        earned = urlVariables[4];

        createItemContent(itemName,10,earned);
    }

    function initListeners(){
    	$(".backButton").click(function(){
    		var newLocation = location.href.split("itemprofile.html")[0] + "itemList.html?random=" + huntId + ":qw:" + teamName;
            location.href = newLocation;
    	});

    	$("#input").change(function(){
    		$(".takePicButton span").html("Processing...");
    	});
    }

    function createItemContent(name,points,earned){
    	var baseDiv = '<div class="headerImage"';
    	if(earned == "true"){
    		db.child('hunts').child(huntId).child('teams').child(teamName).child('pics').once('value', function(snapshot) {
    			var possiblePics = snapshot.val();
	            imgLink = possiblePics[itemIndex];
	    		baseDiv = baseDiv + 'style="background: url(' + "'" + imgLink + "'" + ') no-repeat center center; background-size: cover;"';

	    		baseDiv = baseDiv + '><h2>' + name + '</h2><span';
		    	baseDiv = baseDiv + ' class="earned"';
		    	baseDiv = baseDiv + ">+" + points + "</span></div><p></p>";
		    	$(".itemContent").append(baseDiv);

		    	$("#topTitle").html(name);
	    	});
            
    	} else {
    		baseDiv = baseDiv + '><h2>' + name + '</h2><span';
	    	if(earned == "true"){
	    		baseDiv = baseDiv + ' class="earned"';
	    	}
	    	baseDiv = baseDiv + ">+" + points + "</span></div><p></p>";
	    	$(".itemContent").append(baseDiv);

	    	$("#topTitle").html(name);
    	}
    	
    }

})();