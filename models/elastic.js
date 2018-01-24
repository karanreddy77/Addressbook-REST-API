'use strict';
var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'trace'
});

var indexName = "addressbook";

//Create Index
let initIndex = () => {
    return elasticClient.indices.create({
        index: indexName
    });
}

//Check if index exists
let indexExists = () => {
    return elasticClient.indices.exists({
        index: indexName
    });
}

//Initialize mapping and define data model
let initMapping = () => {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "contact",
        body: {
            properties: {
                username: {
                	type: "text"
                },
                name: { type: "text" },
                email: {
                	type: "keyword",
                	ignore_above: 50
                },
                phone: {
                	type: "long"
                },
                address: { type: "text" },
				city: { type: "text" },
				state: { type: "text" },
				country: { type: "text" },
				zipcode: {
					"type": "keyword",
					"ignore_above": 15
				}
            }
        }
    });
}

// Add document
let addContact = (contact) => {  
    return elasticClient.create({
        index: indexName,
        type: "contact",
        id: contact.username,
        body: {
        	username: contact.username,
            name: contact.name,
            email: contact.email,
			phone: contact.phone,
			address: contact.address,
			city: contact.city,
			state: contact.state,
			country: contact.country,
			zipcode: contact.zipcode
        }
    });
}

// Search contacts
let getContacts = (page, pageSize, query) => {
	return elasticClient.search({
		index: indexName,
		type: "contact",
		size: pageSize,
		from: (page - 1) * pageSize,
		q: query
	});
}

// Search for contact by username
let getContactByUsername = (username) => {
	return elasticClient.get({
		index: indexName,
		type: "contact",
		id: username
	});
}

// Update a contact
let updateContact = (username, contact) => {
    return elasticClient.index({
        index: indexName,
        type: "contact",
        id: username,
        body: {
        	username: username,
            name: contact.name,
            email: contact.email,
			phone: contact.phone,
			address: contact.address,
			city: contact.city,
			state: contact.state,
			country: contact.country,
			zipcode: contact.zipcode
        }
    });
}

// Remove contact
let removeContact = (username) => {
	return elasticClient.delete({
		index: indexName,
		type: "contact",
		id: username
	});
}

module.exports = {
	initIndex,
	indexExists,
	initMapping,
	addContact,
	getContacts,
	getContactByUsername,
	updateContact,
	removeContact
}