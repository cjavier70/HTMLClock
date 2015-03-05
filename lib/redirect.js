function redirectInit() {
   var accessToken = window.location.hash.substring(1);
   var split = accessToken.split("&");
   var data = {};

   data[decodeURIComponent(split[0]) = decodeURIComponent(split[1]);

   window.opener.eval(params['access_token'])();
   window.close();
}

window.onload = redirectInit;
