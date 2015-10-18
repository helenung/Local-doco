(function() {

    window.onload = function(){
    	initListeners();
        initRank();
    }

    function initListeners(){
        $("#itemListNav").click(function(){
            location.href = location.href.replace('/leaderboard.html','') + "/itemList.html";
        });
    }

    function initRank () {
        var rankNum = 1;
        $(".rank").each(function() {
            if(rankNum%2==1){
                $(this).addClass('whiteBg');
            }
            rankNum++;
        });
    }

})();