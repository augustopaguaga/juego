import React, { useEffect } from 'react';

const FacebookButton = () => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '3429789487266257',
        cookie     : true,
        xfbml      : true,
        version    : 'v16.0'
      });
    };
  
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const loginWithFacebook = () => {
    if (typeof window.FB !== 'undefined') {
      window.FB.login(function(response) {
        console.log(response);
      hola();
        
      }, {scope: 'gaming_profile,email,public_profile'});
    }
  };
function hola(){
  window.FB.api('/me/public_profile', function(response) {
    console.log(response);
  });
}
  return (
    <button onClick={loginWithFacebook}>Login with Facebook</button>
  );
};

export default FacebookButton;
