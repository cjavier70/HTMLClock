

var getTime = function() {
	var currentdate = new Date(); 
	var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	var clock = document.getElementById("clock");
	clock.innerHTML = datetime;
	window.setTimeout(getTime, 1000);
}
getTime();