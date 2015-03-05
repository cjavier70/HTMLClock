function redirectInit() {
   var accessToken = window.location.hash.substring(1);
   var regex = /([^&=]+)=([^&]*)/g, temp;
   var data = {};

   while (temp = regex.exec(accessToken)) {
      data[decodeURIComponent(temp[1])] = decodeURIComponent(temp[2]);
   }

   console.log(params['access_token']);
   window.opener.eval(params['access_token'])();
   window.close();
}

window.onload = redirectInit;
