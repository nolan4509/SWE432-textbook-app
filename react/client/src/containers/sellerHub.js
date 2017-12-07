import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import * as Mousetrap from "mousetrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import ReactTooltip from 'react-tooltip';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class SellerHub extends Component {
    constructor(props) {
        super(props)
        this.handleChangeUser = this.handleChangeUser.bind(this)
        this.handleSubmitUser = this.handleSubmitUser.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this)
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
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
            postID: '',
            userID: 'jhunt11',
            teacher: '',
            submissionStatus: ''
        }
    }

    submit = () => {
        confirmAlert({
            title: 'Confirm to submit',                        // Title dialog
            message: 'Are you sure to delete this post.',               // Message dialog

            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: this.deleteClick    // Action after Confirm
        })
    };

    homeClick = () => {
        this.props.history.push("/home")
    }
    addBookClick = () => { // New Book
        this.props.history.push("/addBook")
    }
    editClick = () => { // Edit Info
        fetch(`/user/${this.state.userID}/books/newBook/${this.state.isbn}/${this.state.condition}/${this.state.teacher}/${this.state.courseCode}/${this.state.courseLevel}/${this.state.price}/update/${this.state.postID}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(
            this.setState({
                submissionStatus: `Your post has been saved.`
            }))
            .catch((ex) => {
            console.log('parsing failed', ex)
        })
    }

    deleteClick = () => {
        fetch(`/user/books/${this.state.postID}/remove`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(
            this.setState({
                submissionStatus: `Your post has been deleted.`
            }))
            .then(
                this.setState({
                    courseCode: '',
                    courseLevel: '',
                    author: '',
                    bookName: '',
                    isbn: '',
                    condition: '',
                    price: '',
                    postID: '',
                    teacher: '',
                    course: ''
                })
            )
            .catch((ex) => {
                console.log('parsing failed', ex)
            })
    }

    handleSubmitUser(event) {
        event.preventDefault()
        this.setState({
            userID: this.state.userID
        })
        fetch(`/user/${this.state.userID}/books`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    courseCode: json.course.code,
                    courseLevel: json.course.level,
                    author: json.textbook.author,
                    bookName: json.textbook.name,
                    isbn: json.textbook.isbn,
                    condition: json.condition,
                    price: json.price,
                    postID: json.id,
                    userID: json.seller.id,
                    teacher: json.teacherName,
                    course: json.course.code + json.course.level
                })
                console.log(this.state.postID)
            }).catch((ex) => {
            console.log('parsing failed', ex)
            this.setState({
                courseCode: '',
                courseLevel: '',
                author: '',
                bookName: '',
                isbn: '',
                condition: '',
                price: '',
                postID: '',
                teacher: '',
                course: ''
            })
        })
        event.preventDefault()
    }

    handleChangeUser(event) {
        this.setState({
            userID : event.target.value
        })
    }
    handleChangeTitle(event) {
        this.setState({
            bookName : event.target.value
        })
    }
    handleChangeAuthor(event) {
        this.setState({
            author : event.target.value
        })
    }
    handleChangeCourse(event) {
        this.setState({
            course: event.target.value,
            courseCode: this.state.course.substring(0,2),
            courseLevel: this.state.course.substring(2,5)
        })
    }
    handleChangePrice(event) {
        this.setState({
            price : event.target.value
        })
    }
    componentDidMount() {
        Mousetrap.bind(['shift+c shift+l'], this.wipeFields);
    }
    wipeFields(){
        this.setState({
            courseCode: '',
            courseLevel: '',
            author: '',
            bookName: '',
            isbn: '',
            condition: '',
            price: '',
            postID: '',
            teacher: '',
            course: '',
            userID: '',
            submissionStatus: ''
        })
    }
    render() {
        return (
            <div>
                {/* Seller Hub */}
                <meta charSet="utf-8"/>
                <title>My Books</title>
                <header>
                    <h1>My Books</h1>
                    <div id="topSellerHubButtons">
                        <button onClick={this.homeClick} id="returnHomeButton" className="homeButtons"
                                data-tip data-for='backHomeTip'>
                            Back Home
                        </button>
                        <ReactTooltip id='backHomeTip' aria-haspopup='true' border={true} effect='solid' place='bottom'>
                            <font size='3'> This will bring you back to the home page. In order to search for a course, click
                                here.</font><br/><br/> 
                        </ReactTooltip>

                        <button onClick={this.addBookClick} id="newBookButton">New Book</button>
                    </div>
                </header>
                <div id="pendingBooksTable">
                    <h3>Books I'm Selling:</h3>
                    <div id="userName">
                        <form id="userSearchForm" onSubmit={this.handleSubmitUser}>
                            <label ><strong>Enter Username: </strong></label>
                            <input id="courseSearch" type="text" placeholder="ex. jhunt11"
                                   value={this.state.userID} onChange={this.handleChangeUser}/>
                            <button form="userSearchForm" type="submit">Search</button>
                        </form>
                        <h4>Hello, {this.state.userID}</h4>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td>Title:</td>
                            <td>Author:</td>
                            <td>Course:</td>
                            <td>Price:</td>
                            <td>Edit:</td>
                            <td>Remove?</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input id="bookName" type="text" value={this.state.bookName} onChange={this.handleChangeTitle}/></td>
                            <td><input id="author" type="text" value={this.state.author} onChange={this.handleChangeAuthor}/></td>
                            <td><input id="coursename" type="text" value={this.state.course} onChange={this.handleChangeCourse}/></td>
                            <td><input id="price" type="text" value={this.state.price} onChange={this.handleChangePrice}/></td>
                            <td>
                                <button onClick={this.editClick} id="editBookButton1">Edit Info</button>
                            </td>
                            {/* will need to be careful later on with people being able to edit the book info or price while there are active requests */}
                            <td>
                                <button onClick={this.submit} id="removeBookButton1">Remove</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>{this.state.submissionStatus}</h3>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/addBook'>Add Books Page</Link></li>
                </nav>
            </div>
        );
    }
}
export default SellerHub;