$(function () {

	var w = window;
	var id = location.href.substring(25);
	var url = "getInvest"; 
	var loadData = function (total) {
		var pageNum = parseInt(total / 10) + (total % 10 > 0 ? 1: 0);
		var requests = [];
		for (var i = 1; i <= pageNum; i++) {
			requests.push($.ajax({
				"url": url,
				"method": "POST",
				"data": {
					"pn": i,
					"s": 10,
					"id": id
				}
			}));
		}
		$.when.apply($, requests)
		 .then(function () {
		 	var args = Array.prototype.slice.call(arguments);
		 	var length = args.length == pageNum ? args.length: -1;
		 	var merged = [];
		 	var list;
		 	if (length != -1) {
		 		for (i = 0; i < length; i ++) {
		 			list = args[i][0].list;
		 			merged = merged.concat(list);
		 		}
		 	} else {
		 		list = args[0].list;
		 		merged = merged.concat(list);
		 	}

		 	resolveData(merged);
		 	
		 });
	}

	var resolveData = function (data) {
		var result = {};
		data.forEach(function (e) {
			var time = e.lastupdated;
			time = moment(time).format("YYYY年MM月DD日");
			result[time] = result[time] !== undefined ? result[time] + e.amount : e.amount;
		});
		var table = $("<table cellpadding=\"5\" class=\"list\"></table>");
		var node = "";
		for (var t in result) {
			node += "<tr>";
			node += "<td>" + t +"</td>";
			node += "<td colspan=4>" + result[t] + "</td>";
			node += "</tr>";
		}
		node = $(node);
		$(table).append(node);
		$("body").append(table);
	}

	$.ajax({
		"url": "getInvest",
		"method": "POST",
		"data": {
			"pn": 1,
			"s": 10, 
			"id": id
		}
	}).then(function (data) {
	 	var total = data.total;
	 	loadData(total);
	});

});