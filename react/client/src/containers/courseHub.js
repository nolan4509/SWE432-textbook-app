import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import * as Mousetrap from "mousetrap";
import Spinner from '../components/Spinner';
import Loading from 'react-loading-spinner';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class CourseHub extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.wipeFields = this.wipeFields.bind(this)
        this.state = {
            course: '',
            courseCode: '',
            courseLevel: '',
            author: '',
            bookName: 'No Books.',
            edition: '',
            isbn: '',
            condition: '',
            price: '',
            email: '',
            id: '',
            isLoading: false,
            loadingMessage: 'Searching...',
            submissionStatus: ''
        }
    }

    submit = () => {
        confirmAlert({
            title: 'Confirm to submit',                        // Title dialog
            message: 'Are you sure to send an email.',               // Message dialog

            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.sellerClick,    // Action after Confirm
        })
    };

    homeClick = () => {
        this.props.history.push("/home")
    }
    sellerClick = () => {
        fetch(`/purchase/${this.state.id}`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    email : json,
                    submissionStatus: `Email sent to ${this.state.email}`
                })
            }).catch((ex) => {
            console.log('parsing failed', ex)
            this.setState({
                email : '',
                submissionStatus : ''
            })
        })
    }

    handleSubmit(event) {
        this.setState({
            isLoading: true,
            courseCode: this.state.course.substring(0,2),
            courseLevel: this.state.course.substring(2,5)
        })
        if(this.state.courseCode.length === 2 && this.state.courseLevel.length === 3) {
            fetch(`/courses/${this.state.courseCode}/${this.state.courseLevel}`)
                .then((response) => response.json())
                .then((json) => {
                    this.setState({
                        author : json[0].textbook.author,
                        bookName : json[0].textbook.name,
                        edition : json[0].textbook.edition,
                        isbn : json[0].textbook.isbn,
                        condition : json[0].condition,
                        price : json[0].price,
                        id : json[0].id
                    })
                }).catch((ex) => {
                console.log('parsing failed', ex)
                this.setState({
                    author : '',
                    bookName : 'No Books',
                    edition : '',
                    isbn : '',
                    condition : '',
                    price : '',
                    id : ''
                })
            })
        }
        event.preventDefault()    
    }

    handleChange(event) {
        this.setState({
            course: event.target.value,
            courseCode: this.state.course.substring(0,2),
            courseLevel: this.state.course.substring(2,5),
            isLoading: false
        })
    }
    componentDidMount() {
        Mousetrap.bind(['shift+c shift+l'], this.wipeFields);
    }
    wipeFields(){
        this.setState({
            course : '',
            courseLevel : '',
            courseCode : '',
            author : '',
            bookName : 'No Books',
            edition : '',
            isbn : '',
            condition : '',
            price : '',
            id : '',
            submissionStatus: ''
        })
    }
    //Currently not printing multiple books, just the 1st one
    render() {
        return (
            <div>
                {/* Course Hub */}
                <meta charSet="utf-8"/>
                <title>Course Home</title> {/* Will want this to be something like 'CS100 Home' */}
                <header>
                    <h1>Course Home</h1>
                    <div id="topCourseHubButtons">
                        <button onClick={this.homeClick} id="backHomeButton" className="homeButtons">Back Home</button>
                    </div>
                </header>
                <div id="searchForNewCourse">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="newCourseSearch"><strong>Search for New Course: </strong></label>
                        <input id="courseSearch" type="text" placeholder="ex. 'CS100'"
                               value={this.state.course} onChange={this.handleChange}/>
                        <button id="searchForCourseButton" type="submit" onClick={this.handleSubmit}>Search</button>
                        <Loading isLoading={this.state.isLoading} spinner={Spinner}>{this.state.isLoading ? (
                            this.state.loadingMessage ) : null } 
                            </Loading>
                    </form>
                </div>
                <div id="courseBooksTable">
                    <h3>Books for {this.state.course}</h3> {/*This will be Books for [COURSENAME]*/}
                    <table>
                        <thead>
                        <tr>
                            <td>Title:</td>
                            <td>Author:</td>
                            <td>Edition:</td>
                            <td>ISBN:</td>
                            <td>Condition:</td>
                            <td>Price:</td>
                            <td>Request</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.bookName}</td>
                            <td>{this.state.author}</td>
                            <td>{this.state.edition}</td>
                            <td>{this.state.isbn}</td>
                            <td>{this.state.condition}</td>
                            <td>{this.state.price}</td>
                            <td>
                                <button onClick={this.submit} id="emailSellerButton1">Email Seller</button>
                            </td>
                        </tr>
                        <tr>
                            <h3>{this.state.submissionStatus}</h3>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/emailSeller'>Email Seller Page</Link></li>
                </nav>
            </div>
        );
    }
}

export default CourseHub;