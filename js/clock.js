var divCount = 0;
var myDict = new Array();

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

var insertAlarm = function(hours, mins, ampm, alarmName, objectId) {
	var myDiv = $("<div id ='div"+divCount+"'>");
	myDiv.addClass("flexable");
	myDiv.append("<div id class='name'>"+alarmName+"</div>");
	myDiv.append("<div id class='time'>"+hours+":"+mins+ampm+"</div>");
	var myString = "<input onclick=deleteAlarm("+divCount;
	var stringTwo = ") type='button' value='Delete' class='del button'/>"
	myDiv.append(myString + stringTwo);
	myDict[divCount] = objectId;
	divCount += 1;
	$("#alarms").append(myDiv);
}
var deleteAlarm = function(num) {
    var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	var id = myDict[num];
	query.get(id, {
		success: function(deleteMe) {
			deleteMe.destroy({});
		}
		,error: function(object, error) {
			alert("Error: "+error.message);
		}
	});
	$("#div"+num).remove();
}

var addAlarm = function() {
	var hours = $("#hours option:selected").text(),
		mins = $("#mins option:selected").text(),
		ampm = $("#ampm option:selected").text(),
		alarmName = $("#alarmName option:selected").text();
    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
      success: function(object) {
	  	insertAlarm(hours, mins, ampm, alarmName, object.id);
		hideAlarmPopup();
      }
    });
}

var getAllAlarms = function() {
    Parse.initialize("fdxx6IeWCNmyWed7oxSWnPqQCa4WNTWGKLQAS1sC",
        "Y8PMeKIlHI2zaDLwELvEJeJJ0d9H5OdsF8oLPHlp");
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
				var hr = results[i].get("hours"),
					min = results[i].get("mins"),
					ampm = results[i].get("ampm"),
					name = results[i].get("alarmName");
                insertAlarm(hr, min, ampm, name, results[i].id);
            }
        }
    });
}
getTemp();
getAllAlarms();

