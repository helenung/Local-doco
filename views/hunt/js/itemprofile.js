(function() {

    window.onload = function(){
    	initListeners();
    }

    function initListeners(){
    	$(".backButton").click(function(){
    		location.href = location.href.replace('/itemprofile.html','') + "/itemList.html";
    	});
    }

})();