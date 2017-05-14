var cloudscraper = require('cloudscraper'),
	sleep = require('sleep'),
	async = require('async'),
	movies = require('./module/movies'),
	log = require('./module/log');

var config = {
	'host': 'https://fmovies.io/',
	'movies': 'kind/movies.html',
	mysql: {
		host: 'localhost',
		user: 'root',
		password: 'sapidelman',
		database: 'fmovies'
	}
}


log.write('INFO', 'SCRAP fmovies.io STARTED')

movies.init(config);


next = true;
page = 1;

async.whilst(function() {
		return next == true;
	},
	function(next) {
		log.write('INFO', 'Sync All page ' + page)
		movies.sync_all(page, function(length) {
			if (length == 0) {
				next = false;
			}
			page++;
			sleep.msleep(5000);

			next();
		});

	},
	function(err) {

	});

// process.exit()