function redirectInit() {
   var accessToken = window.location.hash.substring(1);
   var regex = /([^&=]+)=([^&]*)/g, temp;
   var data = {};

   while (temp = regex.exec(accessToken)) {
	  console.log("temp is " + temp);
      data[decodeURIComponent(temp[1])] = decodeURIComponent(temp[2]);
   }

   window.opener.eval(params['access_token'])();
   window.close();
}

window.onload = redirectInit;
