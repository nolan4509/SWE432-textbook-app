const express = require('express');
const path = require('path');
const app = express();
let fetch = require('node-fetch');


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
			POST /user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price
		Update a textbook post
			PUT /user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price/update/:postID
	(Both)
	    -Create new user account
	        POST /add/user/:userName/:userID/:email
*/

//API Key = 10AXC8WX

class Course {
    constructor(code, level, id) {
        this.code = code.toLowerCase(); //CS, MATH, etc.
        this.level = level; //101 , 102, etc.
        this.id = id;
    }
    courseName() {
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
        this.bookPosts = bookPosts;//store integers of the post IDs they currently own
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

let database = firebase.app().database().ref();
let userDatabase = database.child('Users');
let bookPostDatabase = database.child('Posts');

function updateUsers(){//load users from firebase to userArray
    userDatabase.once('value', function (snap) {
        snap.forEach(function (childSnap) {
            userArray[userArray.length] = new User(childSnap.val().userinfo.name, childSnap.val().userinfo.id, childSnap.val().userinfo.email, childSnap.val().userinfo.bookPosts)
        });
    });
}
function updateBookPosts(){//load bookposts from firebase into bookPostArray
    bookPostDatabase.once('value', function (snap) {
        snap.forEach(function (childSnap) {
            bookPostArray[bookPostArray.length] = new BookPost(childSnap.val().bookpost.textbook, childSnap.val().bookpost.id, childSnap.val().bookpost.condition, childSnap.val().bookpost.seller,
                childSnap.val().bookpost.teacherName, childSnap.val().bookpost.price, childSnap.val().bookpost.course);
        });
    });
}

//test data
let testCsCourse = new Course('CS', 101, 0);
let testBook = new Textbook('test book', 9871234567890, 'titletest', 'yolo', 8);
let testUser = new User('John', 'jhunt11', 'jhunt11@gmu.edu', []);
let bookPostArray = [];
bookPostArray[0] = new BookPost(testBook, 100, 'good', testUser, 'Prof. Test', 999999, testCsCourse);
let userArray = [];
userArray[0] = testUser;
//end test data

updateUsers();//loads users from firebase into userArray
updateBookPosts();//loads bookposts from firebase into bookPostArray


//Buyer - Search for a course
app.get('/courses/:courseCode/:courseLevel', function(req, res){
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let retCourses = [];
    let count = 0;

    bookPostArray.map(BP => { //search through bookPostArray for matching course
        if(BP.course.code === courseCode && BP.course.level === courseLevel){
            retCourses[count] = BP;
            count++;
        }
    });
    if(retCourses.length === 0){
        res.send("No books found");
        return;
    }
    res.send(JSON.stringify(retCourses));
});

//Buyer - Retrieve textbook post information
app.get('/posts/:postID', function(req, res){
    let postID = Number(req.params.postID);
    let retPost = null;

    bookPostArray.map(function(post) { //search bookPostArray for matching postID
        if(post.id === postID){
            retPost = post;
            res.send(JSON.stringify(retPost));
        }
    });
    if(retPost === null){
        res.send("ID Not Found.");
    }
});

//Buyer - Request to purchase textbook
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
    res.send(JSON.stringify(retEmail));
});

//Seller - Retrieve all books a user is selling
app.get('/user/:userID/books', function(req, res){
    let userID = String(req.params.userID);
    let seller = null;
    let retPost = null;
    userArray.map(function(user) { //search for user account
        if(user.id === userID){
            seller = user;
        }
    });
    if(seller === null){
        res.send("User Not Found.");
        return;
    }
    let postID = seller.bookPosts[seller.bookPosts.length - 1];
    console.log(seller);
    console.log(seller.bookPosts.length);
    console.log(postID);
    bookPostArray.map(function(post) { //search bookPostArray for matching postID
        if(post.id === postID){
            retPost = post;
            res.send(JSON.stringify(retPost));
        }
    });
    if(retPost === null){
        res.send("ID Not Found.");
    }
});

//Seller - Remove a textbook post for a book that you are selling (Going to require authentication to determine correct user)
app.delete('/user/books/:postID/remove', function(req, res){
    let postID = Number(req.params.postID);
    let postToDelete = null;
    let postIndex = null;
    for(let i in bookPostArray){ //search bookPostArray for matching postID
        if(bookPostArray[i].id === postID){
            postToDelete = bookPostArray[i];
            postIndex = i;
        }
    }
    if(postToDelete === null){
        res.send("Bookpost Not Found.");
        return;
    }
    let seller = postToDelete.seller;
    seller.bookPosts.splice(seller.bookPosts.length -1, 1);

    bookPostArray.splice(postIndex, 1);
    database.child('Posts/' + `${postID}`).remove();
    res.send("Done");
});

//Seller - Create new textbook post with valid ISBN
app.post('/user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price', function (req, res) {
    let userID = String(req.params.userID);
    let isbnNum = Number(req.params.isbnNum);
    let condition = String(req.params.condition);
    let teacher = String(req.params.teacher);
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let price = Number(req.params.price);
    let seller = null;

    fetch(`http://isbndb.com/api/v2/json/10AXC8WX/book/${isbnNum}`)//fetch book info
        .then(function (res) {
            return res.json();
        }).then(function (json) {
        let title = json.data[0].title;
        let edition = json.data[0].edition_info;
        let author = json.data[0].author_data[0].name;
        let textbook = new Textbook(title, isbnNum, title, author, edition);
        let course = new Course(courseCode, courseLevel, 0);
        userArray.map(function(user) { //search for user account
            if(user.id === userID){
                seller = user;
            }
        });
        if(seller === null){
            res.send("User Not Found.");
            return;
        }
        let postIndex = bookPostArray[bookPostArray.length - 1].id + 1;//add 1 to most recent post so all postIDs are unique *** - 1 then + 1?
        bookPostArray[bookPostArray.length] = new BookPost(textbook, postIndex, condition, seller, teacher, price, course);//store new post
        seller.bookPosts[seller.bookPosts.length] = postIndex;//store in sellers list
        database.child('Posts/' + `${postIndex}`).set(//persist firebase
            { bookpost: bookPostArray[bookPostArray.length - 1]
            });
        database.child('Users/' + `${userID}`).set(//persist firebase
            { userinfo: seller
            });
        res.send(bookPostArray[bookPostArray.length - 1]);
    })
        .catch(function (err) {
            if(err.code === 'ENOTFOUND'){//no internet connection
                console.log('Internet Error: ' + err);
            }
            if (err.name === 'TypeError') {//gateway timeout
                console.log("Type Error, bad data");
                res.send("Book not Found.");
            }
            else {//flags 404 and any other client error
                console.log('Error: ' + err.status + ' --- ' + err.statusText);
            }
        });
});

//Seller - Update a textbook post
app.put('/user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price/update/:postID', function (req, res) {
    let userID = String(req.params.userID);
    let isbnNum = Number(req.params.isbnNum);
    let condition = String(req.params.condition);
    let teacher = String(req.params.teacher);
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let price = Number(req.params.price);
    let postID = Number(req.params.postID);
    let seller = null;
    let bookpost = null;

    console.log(userID);
    console.log(isbnNum);
    console.log(condition);
    console.log(teacher);
    console.log(courseLevel);
    console.log(courseCode);
    console.log(price);
    console.log(postID);
    /*fetch(`http://isbndb.com/api/v2/json/10AXC8WX/book/${isbnNum}`)//fetch book info
        .then(function (res) {
            return res.json();
        }).then(function (json) {
        let title = json.data[0].title;
        let edition = json.data[0].edition_info;
        let author = json.data[0].author_data[0].name;
        let textbook = new Textbook(title, isbnNum, title, author, edition);*/
        let course = new Course(courseCode, courseLevel, 0);
        userArray.map(function(user) { //search for user account
            if(user.id === userID){
                seller = user;
            }
        });
        if(seller === null){
            console.log("user not found")
            res.send("User Not Found.");
            return;
        }
        bookPostArray.map(function(post) { //search for bookpost **WHAT IF POST DNE
            if(post.id === postID){
                bookpost = post;
            }
        });
        let textbook = bookpost.textbook;
        bookpost = new BookPost(textbook, bookpost.id, condition, seller, teacher, price, course);//store new post
        database.child('Posts/' + `${bookpost.id}`).set(//persist firebase
            { bookpost: bookpost
            });
        bookPostArray[bookPostArray.length - 1] = bookpost;
        //updateBookPosts();
        //updateUsers();
        console.log(bookpost);
        console.log("----");
        console.log(bookPostArray[bookPostArray.length - 1]);
        res.send(bookpost);
    /*})
        .catch(function (err) {
            if(err.code === 'ENOTFOUND'){//no internet connection
                console.log('Internet Error: ' + err);
            }
            if (err.name === 'TypeError') {//gateway timeout
                console.log("Type Error, bad data");
                res.send("Book not Found.");
            }
            else {//flags 404 and any other client error
                console.log('Error: ' + err.status + ' --- ' + err.statusText);
            }
        });*/
});

//Both - Create new user account name id email bookpossts
app.post('/add/user/:userName/:userID/:email', function (req, res) {
    let userID = String(req.params.userID);
    let userName = String(req.params.userName);
    let email = String(req.params.email);

    userArray[userArray.length] = new User(userName, userID, email, []);
    database.child('Users/' + `${userID}`).set(//store into firebase
        { userinfo: userArray[userArray.length - 1]
        });
    res.send(userArray[userArray.length - 1]);
});


//app.get('/', function(req, res) {
    //res.send("Hello World");
//    res.sendfile('public/login.html')
    //console.log('express');
//});

//app.use(express.static('public'));

//app.use('/static', express.static('public'));

app.use(express.static(path.join(__dirname, 'react/client/build')));



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react/client/public/index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Node app is running on port ${port}`);