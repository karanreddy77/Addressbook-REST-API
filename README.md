# Addressbook-REST-API
A RESTful API for an address book with an Elasticsearch data store.

To install node modules:

```bash
$ npm install
```

To start the server:

```bash
$ npm start
```

Access the API at:

```
http://localhost:3000
```

## Usage

#### GET /contact?pageSize={}&page={}&query={}
Provides a list of all the contacts, with optional parameter pageSize, page and query.

```
http://localhost:3000/contact/pageSize=10&page=1
```

#### POST /contact
Creates a contact where the username field is unique.

```json
{
"username": "michaelscott",
"name": "Michael Scott",
"email": "michaelscott@gmail.com",
"phone": 12345678901,
"address": "Dunder Mifflin",
"city": "Scranton",
"state": "PA",
"country": "USA",
"zipcode": "18503"
}
```

#### GET /contact/{username}
Returns a contact by the unique username.
Example:

```
http://localhost:3000/contact/michaelscott
```

#### PUT /contact/{username}
Updates a contact by the unique username.

#### DELETE /contact/{username}
Deletes a contact by the unique username.

## Configuration
To configue the host/port for the elasticsearch server, modify the value of the `host` key for the `elasticsearch client instance` in the `./models/elastic.js` file as shown below.

```js
var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    ... other config options ...
});
```

