(function() {

    window.onload = function(){
    	initListeners();
    }

    function initListeners(){
    	$(".feedItem").click(function(){
    		location.href = location.href.replace('/index.html','') + "/itemprofile.html";
    	});
    }

})();