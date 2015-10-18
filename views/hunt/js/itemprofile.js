(function() {

	var huntId;
	var teamName;
	var itemIndex;
	var itemName;

    window.onload = function(){
    	initState();
    	initListeners();
    }

    function initState(){
        var db = new Firebase('https://local-doco.firebaseio.com');
        var url = window.location.href.split("?");
        var params = url && url[1] ? url[1].split("=") : null;
        temp = params && params[1] ? params[1] : null;

        var urlVariables = temp.split(":qw:");
        huntId = urlVariables[0];
        teamName = urlVariables[1];
        itemIndex = urlVariables[2];
        itemName = urlVariables[3];

        createItemContent(itemName,10,false);
    }

    function initListeners(){
    	$(".backButton").click(function(){
    		location.href = location.href.replace('/itemprofile.html','') + "/itemList.html";
    	});

    	$("#input").change(function(){
    		$(".takePicButton span").html("Processing...");
    	});
    }

    function createItemContent(name,points,earned,imgLink,description){
    	var baseDiv = '<div class="headerImage"';
    	if(earned){
    		baseDiv = baseDiv + 'style="background: url(' + "'" + imgLink + "'" + ') no-repeat center center; background-size: cover;"';
    	}
    	baseDiv = baseDiv + '><h2>' + name + '</h2><span';
    	if(earned){
    		baseDiv = baseDiv + ' class="earned"';
    	}
    	baseDiv = baseDiv + ">+" + points + "</span></div><p></p>";
    	$(".itemContent").append(baseDiv);

    	$("#topTitle").html(name);
    }


})();