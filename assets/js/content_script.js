(function($, window) {

	var getBiggestImageURL = function() {
		var images = $('img'),
			maxImgSize = {width: 0, height: 0},
			maxImgIndex = 0,
			imgURL = "";

		for(var i = 0; i < images.length; i++) {
			var $curImg = $(images[i]),
				w = $curImg.width(),
				h = $curImg.height();

			if (w * h > maxImgSize.width * maxImgSize.height) {
				maxImgSize.width = $curImg.width();
				maxImgSize.height = $curImg.height();
				imgURL = $curImg.attr("src");
				maxImgIndex = i;
			}
		}
		return imgURL;
	};

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		console.log("A message from background page was detected.");
		if (request.method == "getPageInfo") {
			var title = ($('title') == null) ? "Untitled" : $('title').text();
			sendResponse(
				{
					title: title,
					imgURL: getBiggestImageURL()
				});
		}
	});
})($, window);