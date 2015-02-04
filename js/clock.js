

var getTime = function() {
	var currentdate = new Date(); 
	var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var clock = document.getElementById("clock");
	clock.innerHTML = datetime;
	window.setTimeout(getTime, 1000);
}
getTime();
var getTemp = function() {
	$.getJSON("https://api.forecast.io/forecast/09e44403e53d4689679ca64e1afc336d/35.300399,-120.662362?callback=?", function(data) {
			var items = [];
			
			$.each(data, function(key,val) {
				if(key == "daily") {
					$("#forecastLabel").html(val.summary);
					$("#forecastIcon").attr("src", "img/"+val.icon+".png");
					var className = null;
					var temp = val.data[0].temperatureMax;
					if (temp < 60)
						className = 'cold'
					else if(temp >= 60 && temp < 70)
						className = 'chilly'
					else if(temp >= 70 && temp < 80)
						className = 'nice'
					else if(temp >= 80 && temp < 90)
						className = 'warm'
					else 
						className = 'hot'
					$("body").addClass(className);
				}
			});
			
			$( "<ul/>", {
			    "class": "my-new-list", 
			    html: items.join( "" )
			}).appendTo( "body" );
	});

}

var showAlarmPopup = function() {

	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

var hideAlarmPopup = function() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

var insertAlarm = function(hours, mins, ampm, alarmName) {
	var myDiv = $("<div>");
	myDiv.addClass("flexable");
	myDiv.append("<div id class='name'>"+alarmName+"</div>");
	myDiv.append("<div id class='time'>"+hours+":"+mins+ampm+"</div>");
	$("#alarms").append(myDiv);
}

var addAlarm = function() {

	var hours = $("#hours option:selected").text(),
		mins = $("#mins option:selected").text(),
		ampm = $("#ampm option:selected").text(),
		alarmName = $("#alarmName option:selected").text();
	insertAlarm(hours, mins, ampm, alarmName);
	hideAlarmPopup();
}


getTemp();
