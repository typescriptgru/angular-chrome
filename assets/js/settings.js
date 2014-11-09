(function($, window) {
	//
	angular.module('myMundus', [])
		.controller('HistoryController', ['$scope', function($scope) {
			//
			$scope.histories = ["temp1", "temp2"];
			$scope.DB = chrome.extension.getBackgroundPage().MyMundusDB.getHistories(function(rows){
				$scope.histories = rows;
				$scope.$apply();
			});
		}])
		.controller("TagController", ['$scope', function($scope) {
			$scope.tags = ["tag1", "tag2"];
			$scope.tag = {};
			$scope.DB = chrome.extension.getBackgroundPage().MyMundusDB.getTags(function(tags) {
				if (tags.length > 0) {
					$scope.tags = tags;
					$scope.$apply();
				}
			});
			$scope.addTag = function() {
				$scope.DB.insertTag($scope.tag, function(tags) {
					if (tags.length > 0) {
						$scope.tags = tags;
						$scope.$apply();
					}
				})
			}
		}])
		.controller("FeedController", ['$scope', function($scope) {
			$scope.feeds = ["feed1", "feed2"];
			$scope.feed = {};
		}]);

	$(document).ready(function() {
		$("#histories").isotope({
			// options
			itemSelector: '.history',
			layoutMode: 'fitRows'
		});
	});
})($, window);