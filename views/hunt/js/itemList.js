(function() {

    var fakeInput = {
        items:[
            {id:"0001",
             name:"Water Bottle",
             points:20,
             earned:false
             },
             {id:"0002",
             name:"Umbrella",
             points:10,
             earned:true
             },
             {id:"0003",
             name:"Wallet",
             points:10,
             earned:false
             },
             {id:"0004",
             name:"Kitten",
             points:30,
             earned:true
             },
             {id:"0005",
             name:"Husky",
             points:30,
             earned:false
             }
        ]
    }

    var fakeItems = {
        '0001':{
            img:'https://upload.wikimedia.org/wikipedia/commons/0/07/Multi-use_water_bottle.JPG'
        },
        '0002':{
            img:'http://ak.picdn.net/shutterstock/videos/2624345/preview/stock-footage-umbrella-on-the-road-under-rain.jpg'
        },
        '0003':{
            img:'https://s-media-cache-ak0.pinimg.com/736x/43/bf/a4/43bfa44e28e6badab50c614cf72004b5.jpg'
        },
        '0004':{
            img:'http://images4.fanpop.com/image/photos/16100000/Cute-Kitten-kittens-16123796-1280-800.jpg'
        },
        '0005':{
            img:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Siberian_Husky_with_Blue_Eyes.jpg'
        },
    }

    window.onload = function(){
        loadItems();
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

    function loadItems(){
        var items = fakeInput.items;
        for(var i = 0; i < items.length; i++){
            var itemName = items[i].name;
            var itemPoints = items[i].points;
            var earned = items[i].earned;
            if(earned){
                addItem(itemName,itemPoints,earned,fakeItems[items[i].id].img)
            } else {
                addItem(itemName,itemPoints,earned);
            }
        }
    }

    function addItem(name,score,earned,imgLink){
        var baseDiv;
        if(earned){
            baseDiv = '<div class="feedItem" style="background: url(' + "'" + imgLink + "'" + ') no-repeat center center; background-size: cover;">' + '<h2>' + name + '</h2><span class="earned">+' + score + '</span></div>';
        } else {
            baseDiv = '<div class="feedItem"><h2>' + name + '</h2><span>+' + score + '</span></div>';
        }
        $(".feed").append(baseDiv);
    }

})();











