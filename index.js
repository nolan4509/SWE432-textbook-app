let express = require('express');
let app = express();
let fetch = require('node-fetch');

app.set('port', (process.env.PORT || 5000));

/*
Scenarios:
	(Buyers)
		-Search for a Course
			GET /courses/:courseID
		-Retrieve textbook post information
			GET /courses/:courseID/:postID
		-Request to purchase textbook
			GET /courses/:courseID/:postID/purchase (This will be the page that has the 'Send' button to send the seller an email requesting to purchase the textbook)

	(Sellers)
		-Retrieve all books user is selling
			GET /user/:userID/books
		-Remove a textbook post for a book that you are selling (Going to require authentication to determine correct user)
			DELETE /user/:userID/books/:postID/remove
		Create new textbook post
			POST /user/:userID/books/newBook
		Update a textbook post
			PUT /user/:userID/books/:postID/update
*/

class Course {
    constructor(code, level, id) {
        this.code = code; //101 , 102, etc.
        this.level = level; //CS, MATH, etc.
        this.id = id;
    }
    name() {
    	return this.code + this.level; //CS101
    }
}

class Textbook {
    constructor(name, isbn, title, author, edition) { //The essentials
        this.name = name;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.edition = edition;
    }
}

class User {
	constructor(name, id, email, bookPosts) {
		this.name = name;
		this.id = id;
		this.email = email;
		this.bookPosts = bookPosts;
	}
}

class BookPost {
	constructor(textbook, id, condition, seller, teacherName, price) {
		this.textbook = textbook;
		this.id = id;
		this.condition = condition;
		this.seller = seller;
		this.teacherName = teacherName;
		this.price = price;
	}
}

app.get('/', function(request, response) {
    response.send("Hello World")
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});