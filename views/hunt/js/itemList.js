(function() {

    window.onload = function(){
    	initListeners();
    }

    function initListeners(){
    	$(".feedItem").click(function(){
    		location.href = location.href.replace('/itemList.html','') + "/itemprofile.html";
    	});

    	$("#leaderNav").click(function(){
    		location.href = location.href.replace('/itemList.html','') + "/leaderboard.html";
    	});
    }

})();