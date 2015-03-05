var clientId, loginType, cb;

function init(login) {
	clientId = login.client_id;
	loginType = login.type;
	cb = login.callback_function;
}

function login() {
	var url = "https://api.imgur.com/oauth2/authorize?client_id=";
	var url2 = clientId + "&response_type="+loginType;
	var masterUrl = url + url2;
	window.open(masterUrl, "name", "height=300, width=200");

}
