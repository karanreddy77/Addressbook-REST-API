'use strict';
var express = require('express');
var router = express.Router();
var url = require('url');
var elastic = require('../models/elastic');

// GET /contact
router.get('/contact', (req, res) => {
	let baseURI = url.parse(req.url, true);
	let page = (Object.prototype.hasOwnProperty.call(baseURI.query,'page')) ? baseURI.query.page : 1;
	let pageSize = (Object.prototype.hasOwnProperty.call(baseURI.query,'pageSize')) ? baseURI.query.pageSize : 10;
	let query = baseURI.query.query;
	elastic.getContacts(page, pageSize, query)
		.then(contacts => {
			res.json(contacts);
		})
		.catch(error => {
			res.json(error);
		});
});

// POST /contact
router.post('/contact', (req, res) => {
	let contact = req.body;
	if(contact.zipcode.length > 50) {
		contact.zipcode = contact.zipcode.substring(0, 49);
	}
	elastic.addContact(contact)
		.then(contact => {
			res.json(contact);
		})
		.catch(error => {
			res.json(error);
		});
});

// GET /contact/{username}
router.get('/contact/:username', function(req, res) {
	let username = req.params.username;
	elastic.getContactByUsername(username)
		.then(contact => {
			res.json(contact);
		})
		.catch(error => {
			res.json(error);
		});
});

// PUT /contact/{username}
router.put('/contact/:username', function(req, res) {
	let username = req.params.username;
	let contact = req.body;
	if(contact.zipcode.length > 50) {
		contact.zipcode = contact.zipcode.substring(0, 49);
	}
	elastic.getContactByUsername(username)
		.then(result => {
			elastic.updateContact(username, contact)
				.then(contact => {
					res.json(contact);
				})
		})
		.catch(error => {
			res.json(error);
		});
});

// DELETE /contact/{username}
router.delete('/contact/:username', function(req, res) {
	let username = req.params.username;
	elastic.removeContact(username)
		.then(contact => {
			res.json(contact);
		})
		.catch(error => {
			res.json(error);
		});
});

module.exports = router;