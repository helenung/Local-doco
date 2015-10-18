(function() {

    window.onload = function(){
    	initListeners();
    }

    function initListeners(){
    	$("#startButton").click(function(){
    		location.href = location.href.replace('/index.html','') + "/itemList.html";
    	});
    }

})();