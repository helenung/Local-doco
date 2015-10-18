(function() {

	$(function() {
    	var url = window.location.href.split("?");
    	var params = url && url[1] ? url[1].split("=") : null;
    	var huntId = params && params[1] ? params[1] : null;

    	if (url && params && huntId) {
	    	loadFeed(huntId);
	    	loadLeaderboard(huntId);
	    	console.log(huntId);
	    }
	});

	

	var items = {
		"1": "friends at dubHacks"
	};

	var teams = {
		"1": "greatest team ev4",
		"2": "sum loser team"
	}

	function loadLeaderboard(id) {
		//var leaders = getScores(id);
		var leaders = [{
			"score": 10,
			"teamId": 1,
			"times": "2hrs"
		}, {
			"score": 4,
			"teamId": 2,
			"times": "5billion hrs"
		}]

		var list = $("<ol>");

		leaders.forEach(function(participant) {
			var listItem = $("<li>").html(teams[participant.teamId] + " : " + participant.score + " points : " + participant.times);
			list.append(listItem);
		});

		$("#leaderboard").append(list);
	}

	function loadFeed(id) {
		//var submissions = getHistory(id, 10);
		var submissions = [{
			"itemId": 1,
			"teamId": 1,
			"imageURL": "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12096342_10208151240163120_4798659760476493939_n.jpg?oh=93c99f773335edf414ee05405551d5c0&oe=56CF3D42"
		}, {
			"itemId": 1,
			"teamId": 2,
			"imageURL": "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12112104_10153256723648741_5486616484579004564_n.jpg?oh=af4e2fb781fbad38633a71ea84172626&oe=56BED77F"
		}];

		submissions.forEach(function(submission) {
			var moment = $("<div>");
			var teamId = submission.teamId;
			var itemId = submission.itemId;
			var image = submission.imageURL;
			var img = $("<img>").attr("src", image);
			var span = $("<p>").html(teams[teamId] + " found " + items[itemId] + "!");
			moment.append(span).append(img);
			$("#feed").append(moment);
		})

	}

})();