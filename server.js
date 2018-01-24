'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var elastic = require('./models/elastic');
var router = require('./routes/');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

elastic.indexExists()
	.then(exists => {
		if(!exists) {
			return elastic.initIndex()
						.then(elastic.initMapping);
		}
	})
	.catch(error=> {
		console.log(error);
	});

app.listen(3000, function() {
	console.log('Server is running on port 3000');
});