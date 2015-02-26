var divCount = 0;
var myDict = new Array();
var loggedIn = false;



 window.fbAsyncInit = function() {
   FB.init({
	 appId      : '1552158565069405',
	 xfbml      : true,
	 version    : 'v2.1'
   });
 };

 (function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "http://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1552158565069405',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
	
    FB.api('/me', function(response) {
	  //IT WORKED HALLELULIGHA	
	  loggedIn = true;
	  getAllAlarms('1552158565069405');
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }


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
	ga('send', 'event', 'Alarm', 'Delete');
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
    Parse.initialize("fdxx6IeWCNmyWed7oxSWnPqQCa4WNTWGKLQAS1sC",
        "Y8PMeKIlHI2zaDLwELvEJeJJ0d9H5OdsF8oLPHlp");
	ga('send', 'event', 'Alarm', 'Add');
	var hours = $("#hours option:selected").text(),
		mins = $("#mins option:selected").text(),
		ampm = $("#ampm option:selected").text(),
		alarmName = $("#alarmName option:selected").text();
    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
	//IF LOGGED IN IS SET
	  if(loggedIn) {
		  alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName, "fbId": '1552158565069405'}, {
			  success: function(object) {
				insertAlarm(hours, mins, ampm, alarmName, object.id);
				hideAlarmPopup();
			  }
		});
	  }
	  else {
		  alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName, "fbId": null}, {
			  success: function(object) {
				insertAlarm(hours, mins, ampm, alarmName, object.id);
				hideAlarmPopup();
			  }
		});
	  }
}

var getAllAlarms = function(userId) {
	console.log("GET ALL ALARMS CALLED");
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
					name = results[i].get("alarmName"),
					fbId = results[i].get("fbId");
				//useless line
				if(userId == fbId) {
					//DONT FUCK WITH INSERTALARM
	                insertAlarm(hr, min, ampm, name, results[i].id);
					console.log("alarm inserted");
				}
				else {
					console.log("nope, doesnt work");

				}
            }
        }
    });
}
getTemp();

//TO DO: Move js from html
//TO DO: Move getAllAlarms in response
