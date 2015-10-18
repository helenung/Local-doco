(function() {

    window.onload = function(){
    	initListeners();
    }

    function initListeners(){
    	$(".backButton").click(function(){
    		location.href = location.href.replace('/itemprofile.html','') + "/itemList.html";
    	});

    	$("#input").change(function(){
    		$(".takePicButton span").html("Processing...");
    	});

    	createItemContent("umbrella",40,true,'https://upload.wikimedia.org/wikipedia/commons/d/d2/Siberian_Husky_with_Blue_Eyes.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ullamcorper orci. Sed pellentesque sapien ut nibh eleifend cursus.');
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
    	baseDiv = baseDiv + ">+" + points + "</span></div><p>" + description + "</p>";
    	$(".itemContent").append(baseDiv);

    	$("#topTitle").html(name);
    }




})();