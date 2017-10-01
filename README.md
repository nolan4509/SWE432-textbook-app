1. 
	SWE432 Textbook App done by John Hunt and Nolan Meeks.

2.
	SwiftText Exchange. SwiftText Exchange is a web application that serves to connect students who are planning on taking a certain college course with students who have just completed that course. This web app will allow the buyers to search by a course title to immediately see all the books associated with that course that other students are selling, as well as some extra information such as the price proposed, the post date, and the teacher who required the book. This will limit the amount of searches for students who are looking to buy their books, since if any class requires multiple books they still will only have to search one time. When a student is creating a new entry for a book they want to sell, our app will use the ISBNdb to search via isbn if the book already exists in the external API's database. If it does, all of the book information will be gotten from the response back to autofill the information for the seller, leaving only a few extra fields for them to fill out such as the price they are selling the book for, etc. If no book exists in the database, then users will have to manually fill out the textbook information themselves.

3. 
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


4. https://swe432-textbook-app.herokuapp.com
