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
			GET /purchase/:postID (This will be the page that has the 'Send' button to send the seller an email requesting to purchase the textbook)

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

//API Key = 10AXC8WX

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

//test data
let testCsCourse = new Course('CS', 101, 0);
let testBook = new Textbook('test book', 9871234567890, 'titletest', 'yolo', 8);
let testUser = new User('John', 'jhunt11', 'jhunt11@gmu.edu', []);
let bookPostArray = [];
bookPostArray[0] = new BookPost(testBook, 100, 'good', testUser, 'Prof. Test', 999999, testCsCourse);
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

//Retrieve textbook post information
app.get('/posts/:postID', function(req, res){
    let postID = Number(req.params.postID);
    let retPost = null;

    bookPostArray.map(function(post) { //search bookPostArray for matching postID
        if(post.id === postID){
            retPost = post;
            res.send(retPost);
        }
    });
    if(retPost === null){
        res.send("ID Not Found.");
    }
});

//Create new textbook post /user/:userID/books/newBook
app.post('/user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price', function (req, res) {
    let userID = String(req.params.userID);
    let isbnNum = Number(req.params.isbnNum);
    let condition = String(req.params.condition);
    let teacher = String(req.params.teacher);
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let price = Number(req.params.price);
    let courseID = courseCode + courseLevel;
    let courseFound = null;
    let textbook = null;

    fetch(`http://isbndb.com/api/v2/json/10AXC8WX/book/${isbnNum}`)//fetch book info
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            let title = json.data[0].title;
            let edition = json.data[0].edition_info;
            let author = json.data[0].author_data[0].name;
            textbook = new Textbook(title, isbnNum, title, author, edition);
            bookPostArray.map(function (course) { //search through bookPostArray for matching course
                if (course.course.name() === courseID) {
                    courseFound = course.course;
                }
            })
            let postIndex = bookPostArray[bookPostArray.length - 1].id + 1;//add 1 to most recent post so all postIDs are unique
            bookPostArray[bookPostArray.length] = new BookPost(textbook, postIndex, condition, testUser, teacher, price, courseFound);//store new post
            database.ref('Posts/' + `${postIndex}`).set(//persist firebase
                { bookpost: bookPostArray[bookPostArray.length - 1]
                });
            res.send(bookPostArray[bookPostArray.length - 1]);
    })
        .catch(function (err) {
            if(err.code === 'ENOTFOUND'){//no internet connection
                console.log('Internet Error: ' + err);
            }
            if (err.name === 'TypeError') {//gateway timeout
                console.log("Type Error, bad data");
            }
            else {//flags 404 and any other client error
                console.log('Error: ' + err.status + ' --- ' + err.statusText);
            }
        });
});
//-Request to purchase textbook
//GET /courses/:postID/purchase
app.get('/purchase/:postID', function(req, res){
    let postID = Number(req.params.postID);

    let retEmail = null;

    bookPostArray.map(function(post) { //search through bookPostArray for matching course
        if(post.id === postID){
            retEmail = post.seller.email;
        }
    });
    if(retEmail === null){
        res.send("No post found.");
        return;
    }
    res.send(retEmail);
});

app.get('/', function(req, res) {
    res.send("Hello World");
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});