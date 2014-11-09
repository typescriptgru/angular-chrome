window.fbAsyncInit = function() {
	FB.init({
		appId      : '576849675794463',
		xfbml      : true,
		version    : 'v2.2'
	});

	// ADD ADDITIONAL FACEBOOK CODE HERE
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];

	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = chrome.extension.getURL("assets/js/sdk.js");
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));