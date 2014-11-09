(function($, window) {

	var DB = function() {
		this.preserved = null;
		this.histoies = null;
		this.tags = null;
		this.feeds = null;
	}

	DB.prototype = {
		init: function() {
			console.log("Initializing...");
		},

		prepareDatabase:  function() {
			var self = this;
			var db = openDatabase('mymundus', '1.0', 'Database to store history of users.', 5*1024*1024);
			db.transaction(function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS urls (url unique, title, img_url, favicon_url, summary, tag, created_at)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS tags (tag unique, entries INTEGER, created_at, updated_at)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS feeds (iaddress unique, text, created_at)');
			});
		},

		insertURL: function(url, title, img_url, favicon_url, summary, tag) {
			//
			var db = openDatabase('mymundus', '1.0', 'Database to store history of users.', 5*1024*1024);
			db.transaction(function (tx) {
				tx.executeSql('INSERT INTO urls (url, title, img_url, favicon_url, summary, tag, created_at) VALUES ("' 
					+ url + '", "' + 
					title + '", "' + 
					img_url + '", "' + 
					favicon_url + '", "' + 
					summary + '", "' + 
					tag + '", "' + 
					new Date().getTime() + '")');
			});
		},

		insertTag: function(tag, callback) {
			//
			var db = openDatabase('mymundus', '1.0', 'Database to store history of users.', 5*1024*1024);
			db.transaction(function (tx) {
				tx.executeSql("INSERT INTO tags (tag, entries, created_at, updated_at) VALUES ('" 
					+ tag.tag + "', " + 
					0 + ", '" + 
					new Date().getTime() + "', '" + new Date().getTime() + "')", [], function(tx, results) {
						tx.executeSql("SELECT * FROM tags", [], function(tx, results) {
							var temp = [];

							if (results.rows.length > 0) {
								for (var i = 0; i < results.rows.length; i++) {
									temp[i] = results.rows.item(i);
								}
							}
							if (typeof callback == "function") {
								callback(temp);
							}
						});
				});
			});
		},

		getHistories: function(callback) {
			//
			var self = this;
			var db = openDatabase('mymundus', '1.0', 'Database to store history of users.', 5*1024*1024);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * from urls', [], function(tx, results) {
					var temp = [],
						rows = results.rows;

					for (var i = 0; i < rows.length; i++) {
						temp[i] = rows.item(i);
					}
					self.tags = temp;
					if (typeof callback == "function") {
						callback(temp);
					}
				});
			});
			return this;
		},

		getTags: function(callback) {
			//
			var self = this;
			var db = openDatabase('mymundus', '1.0', 'Database to store history of users.', 5*1024*1024);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * from tags', [], function(tx, results) {
					var temp = [],
						rows = results.rows;

					for (var i = 0; i < rows.length; i++) {
						temp[i] = rows.item(i);
					}
					self.histories = temp;
					if (typeof callback == "function") {
						callback(temp);
					}
				});
			});
			return this;
		}
	}
	window.MyMundusDB = new DB();
})($, window);