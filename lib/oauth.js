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
	var win = window.open(masterUrl, "name", "height=520, width=450");
/*    if (window.focus) {
       win.opener = this.window;
       win.focus();
   }*/
}

function callback() {
   $.ajax({
      url: "https://api.imgur.com/3/account/me",
      type: "GET",
      dataType: "json",
      success: function (result) {
         alert("Logged in as: " + result.data.url);
      },
      error: function (result) {
         console.log(JSON.stringify(result));
      },
      beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("OAuth2"));
      }
   });
}
