let express = require('express');
let app = express();
let fetch = require('node-fetch');

app.set('port', (process.env.PORT || 5000));

/*
Scenarios:
	(Buyers)
		-Search for a Course
			GET /courses/:courseCode/:courseLevel
		-Retrieve textbook post information
			GET /posts/:postID
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
        this.code = code.toLowerCase(); //CS, MATH, etc.
        this.level = level; //101 , 102, etc.
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
	constructor(textbook, id, condition, seller, teacherName, price, course) {
		this.textbook = textbook;
		this.id = id;
		this.condition = condition;
		this.seller = seller;
		this.teacherName = teacherName;
		this.price = price;
		this.course = course;
	}
}

const firebase = require("firebase");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYVmMA2jzaP7B6R3V-6xbxtJ8109C_UPk",
    authDomain: "swe432-29722.firebaseapp.com",
    databaseURL: "https://swe432-29722.firebaseio.com",
    projectId: "swe432-29722",
    storageBucket: "",
    messagingSenderId: "957222857407"
};
firebase.initializeApp(config);

let database = firebase.database();
database.ref('users/' + 'Josh').set(
    { username: 'Josh', email: 'josh@gmail.com'
    });

//test data
let testCsCourse = new Course('CS', 101, 0);
let testBook = new Textbook('test book', 9871234567890, 'titletest', 'yolo', 8);
let testUser = new User('John', 'jhunt11', 'jhunt11@gmu.edu', []);
let bookPostArray = [];
bookPostArray[0] = new BookPost(testBook, 123, 'good', testUser, 'Prof. Test', 999999, testCsCourse);
//end test data

//Search for a course
app.get('/courses/:courseCode/:courseLevel', function(req, res){
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let courseID = courseCode + courseLevel;
    let retCourses = [];
    let count = 0;

    bookPostArray.map(function(course) { //search through bookPostArray for matching course
        if(course.course.name() === courseID){
            retCourses[count] = course;
            count++;
        }
    });
    if(retCourses.length === 0){
        res.send("No books found");
        return;
    }
    res.send(retCourses);
});

app.get('/', function(req, res) {
    res.send(testCsCourse.name())
    //res.send("Hello World");
});

//Retrieve textbook post information
app.get('/posts/:postID', function(req, res){
    let postID = Number(req.params.postID);
    let retPost = null;

    bookPostArray.map(function(post) { //search through bookPostArray for matching course
        if(post.id === postID){
            retPost = post;
            res.send(retPost);
        }
    });
    if(retPost === null){
        res.send("ID Not Found.");
    }
});

app.get('/', function(req, res) {
    res.send(testCsCourse.name())
    //res.send("Hello World");
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});