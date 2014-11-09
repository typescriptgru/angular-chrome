(function($, window){
	//
	// alert("hello");
	var settingsPageURL = chrome.extension.getURL('assets/html/settings.html');

	var NotBookmarkedUrl = function(url, callback) {
		chrome.bookmarks.getTree(function(bookmarks){
			for(var i = 0; i < bookmarks.length; i++){
				var curBMChildren = bookmarks[i].children;
				for(var j = 0; j < curBMChildren.length; j++) {
					var curChildInDepth1 = curBMChildren[j].children;
					for(var k = 0; k < curChildInDepth1.length; k++) {
						var curChildInDepth2 = curChildInDepth1[k];
						if (curChildInDepth2.url == url) {
							console.log(url + " was bookmarked..");
							return;
						}
					}
				}
			}
			if (typeof callback == "function") {
				callback();
			}
		})
	}

	chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON

		chrome.tabs.query({},function(tabs){  
			for(var i = 0; i < tabs.length; i++) {
				if (tabs[i].url == settingsPageURL) {
					return;
				}
			}
			chrome.tabs.create({'url': chrome.extension.getURL('assets/html/settings.html')});
		});
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
		if (updatedTab.url != "chrome://newtab/" && updatedTab.url != settingsPageURL && changeInfo.status == "complete") {
			NotBookmarkedUrl(updatedTab.url, function(){
				chrome.tabs.get(tabId, function(tab) {
					chrome.tabs.sendMessage(tabId, {method: "getPageInfo"}, function(response) {
						window.MyMundusDB.insertURL(tab.url, tab.title, response.imgURL, tab.favIconUrl, "summary text", "Test tag");
						console.log(updatedTab.url + " is not bookmarked yet...");
					});
				});
			});

			console.log(updatedTab.url + " was opend.");
		}
	});


	chrome.runtime.onInstalled.addListener(function(details){
		if(details.reason == "install"){
			console.log("This is a first install!");
		}else if(details.reason == "update"){
			var thisVersion = chrome.runtime.getManifest().version;
			console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
		}
		window.MyMundusDB.prepareDatabase();
	});


})(jQuery, window);