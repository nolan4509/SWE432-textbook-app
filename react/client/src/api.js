import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

//This file is where we will be making calls to the backend API. If it gets to unwieldy, can make a 
//folder with multiple XXXapi.js files inside.

//Buyer - Search for a course
//app.get('/courses/:courseCode/:courseLevel', function(req, res){
class Course extends Component {
	constructor() {
		super();
		this.state = { //set initial state
			pictures: [],
		};
	}

	componentDidMount() {
		fetch('/courses/:courseCode/:courseLevel') //fetch + api call
		.then(results => {
			return results.json(); //results - usually json
			}).then(data => {
				let pictures = data.results.map((pic) => { //map over the data
					return(
						<div key={pic.results}> //set key, then select what data to return
							<img src={pic.picture.medium} /> 
						</div>
					)
				})
			this.setState({pictures: pictures}); //set the state with this.setState
			console.log("state", this.state.pictures); 
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	render() {
		return (
			<div className="container2">
				<div className="container1">
					{this.state.pictures}
				</div>
			</div>
		)
	}
}




//Buyer - Retrieve textbook post information
//app.get('/posts/:postID', function(req, res){







//Buyer - Request to purchase textbook
//GET /courses/:postID/purchase
//app.get('/purchase/:postID', function(req, res){







//Seller - Retrieve all books a user is selling
//app.get('/user/:userID/books', function(req, res){