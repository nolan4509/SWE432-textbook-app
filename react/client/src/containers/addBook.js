import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom'
import '../style.css';
import * as Mousetrap from "mousetrap";

class AddBook extends Component {
    constructor(props) {
        super(props)
        //this.handleSubmitBook = this.handleSubmitBook.bind(this)
        this.handleIsbnLookup = this.handleIsbnLookup.bind(this)
        this.handleChangeIsbn = this.handleChangeIsbn.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this)
        this.handleChangeEdition = this.handleChangeEdition.bind(this)
        this.handleChangePublisher = this.handleChangePublisher.bind(this)
        this.handleChangeCopyright = this.handleChangeCopyright.bind(this)
        this.handleChangeComments = this.handleChangeComments.bind(this)
        this.handleChangeCourse = this.handleChangeCourse.bind(this)
        this.handleChangeTeacher = this.handleChangeTeacher.bind(this)
        this.handleChangeCondition = this.handleChangeCondition.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
        this.wipeFields = this.wipeFields.bind(this)
        this.state = {
            complete: false,
            isbn: '',
            title: '',
            author: '',
            edition: '',
            publisher: '',
            copyright: '',
            comments: '',
            course: '',
            courseLevel: '',
            courseCode: '',
            teacher: '',
            condition: '',
            price: '',
            userID: 'jhunt11'
        }
    }

    homeClick = () => {
        this.props.history.push("/home")
    }

    sellerHubClick = () => { // New Book
        this.props.history.push("/sellerHub")
    }

    postBook = () => {
        this.preventDefault()
        this.target.reset()
        this.setState({
            complete: false
        })
        console.log('courseCode = ' + this.state.courseCode)
        console.log('courseLevel = ' + this.state.courseLevel)
        console.log('course = ' + this.state.course)
        fetch(`/user/${this.state.userID}/books/newBook/${this.state.isbn}/${this.state.condition}/${this.state.teacher}/${this.state.courseCode}/${this.state.course.substr(-3)}/${this.state.price}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(alert(`Post successfully created`))
            .catch((ex) => {
            console.log('parsing failed', ex)
        })
        this.props.history.push("/sellerHub")
    }

    handleIsbnLookup(event) {
        this.setState({
            isbn : event.target.value
        })
    }

    handleChangeIsbn(event) {
        this.setState({
            isbn : event.target.value
        })
    }

    handleChangeTitle(event) {
        this.setState({
            title : event.target.value
        })
    }

    handleChangeAuthor(event) {
        this.setState({
            author : event.target.value
        })
    }

    handleChangeEdition(event) {
        this.setState({
            edition : event.target.value
        })
    }

    handleChangePublisher(event) {
        this.setState({
            publisher : event.target.value
        })
    }

    handleChangeCopyright(event) {
        this.setState({
            copyright : event.target.value
        })
    }

    handleChangeComments(event) {
        this.setState({
            comments : event.target.value
        })
    }

    handleChangeCourse(event) {
        this.setState({
            course : event.target.value,
            courseLevel: this.state.course.substr(-3), 
            courseCode: this.state.course.substring(0,2)
            
        })
    }

    handleChangeTeacher(event) {
        this.setState({
            teacher : event.target.value
        })
    }

    handleChangeCondition(event) {
        this.setState({
            condition : event.target.value
        })
    }

    handleChangePrice(event) {
        this.setState({
            price : event.target.value,
            complete : event.target.value > 0
        })
    }
    componentDidMount() {
        Mousetrap.bind(['shift+c shift+l'], this.wipeFields);
    }
    wipeFields(){
        this.setState({
            isbn: '',
            title: '',
            author: '',
            edition: '',
            publisher: '',
            copyright: '',
            comments: '',
            course: '',
            courseLevel: '',
            courseCode: '',
            teacher: '',
            condition: '',
            price: '',
            userID: ''
        })
    }



    render() {

        const {complete} = this.state

        return (
            <div>
                {/* New Book*/ }
                <meta charSet="utf-8"/>
                <title>Add Book</title>
                <header>
                    <h1>Add Book</h1>
                    <div id="isbnLookup"> {/* this is the call to isbndb.com to try and fill out the fields in the book info form */}
                        <form id="isbnLookupForm" onSubmit={this.handleIsbnLookup}>
                            <label htmlFor="isbnField">Know the ISBN? (Dont use this right now lol) </label>
                            <input id="isbnField" type="text" placeholder="ex. '1234567890'"/>
                            <button id="searchForIsbn" form="isbnLookupForm" type="submit">Search</button>
                        </form>
                    </div>
                </header>
                <br/>
                <br/>
                <div id="bookInfo">
                    <h3>New Book:</h3>
                    <form id="bookInfoForm" onSubmit={this.postBook}>
                        <Prompt
                            when={!complete}
                            message={location => (
                            `Are you sure you want to go to ${location.pathname} before finishing your book post?`
                            )}
                        />
                        <div>
                            <label htmlFor="isbnField">*Isbn: </label>
                            <input id="isbnField" type="text" required placeholder="ex. '1234567890'"
                                value={this.state.isbn} onChange={this.handleChangeIsbn}
                                pattern="[0-9]{13}"/>
                        </div>
                        <div>
                            <label htmlFor="titleField">*Title: </label>
                            <input id="titleField" type="text" required
                                value={this.state.title} onChange={this.handleChangeTitle}
                                pattern="[A-Za-z0-9\s]{0,}"/>
                        </div>
                        <div>
                            <label htmlFor="authorField">*Author: </label>
                            <input id="authorField" type="text" required
                                value={this.state.author} onChange={this.handleChangeAuthor}
                                pattern="[A-Za-z\s]{0,}"/>
                        </div>
                        <div>
                            <label htmlFor="editionField">*Edition: </label>
                            <input id="editionField" type="text" required placeholder="ex. '5th'"
                                value={this.state.edition} onChange={this.handleChangeEdition}
                                pattern="\d{0,}[A-Za-z]{2}"/>
                        </div>
                        <div>
                            <label htmlFor="publisherField">Publisher: </label>
                            <input id="publisherField" type="text" 
                                value={this.state.publisher} onChange={this.handleChangePublisher}/>
                        </div>
                        <div>
                            <label htmlFor="copyrightField">Copyright: </label>
                            <input id="copyrightField" type="number" 
                                value={this.state.copyright} onChange={this.handleChangeCopyright}
                                pattern="\d{4}"/>
                        </div>
                        <div>
                            <label htmlFor="commentsField">Comments: </label>
                            <textarea id="commentsField" rows={5} cols={25}
                                value={this.state.comments} onChange={this.handleChangeComments}/>
                        </div>
                        <div>
                            <label htmlFor="courseField">*Course: </label>
                            <input id="courseField" type="text" required placeholder="ex. 'CS100'"
                                value={this.state.course} onChange={this.handleChangeCourse}
                                pattern="[A-Za-z]{2}\d{3}"/>
                        </div>
                        <div>
                            <label htmlFor="teacherField">*Teacher: </label>
                            <input id="teacherField" type="text" required
                                value={this.state.teacher} onChange={this.handleChangeTeacher}/>
                        </div>
                        <div>
                            <label htmlFor="conditionField">*Condition: </label>
                            <input id="conditionField" type="text" placeholder="ex. 'Great'" required
                                value={this.state.condition} onChange={this.handleChangeCondition}/>
                        </div>
                        <div>
                            <label htmlFor="priceField">*Price: $</label>
                            <input id="priceField" type="number" required placeholder="ex. '30.50'"
                                   value={this.state.price} onChange={this.handleChangePrice}
                                   pattern="\d{0,}(\.\d{1,2})"/>
                        </div>
                        <button id="postBookButton" form="bookInfoForm" type="submit">Post Book</button>
                    </form>
                </div>
                <div>
                    <p>NAV LINKS</p>
                    <nav>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/sellerHub'>My Books Page</Link></li>
                    </nav>
                </div>
            </div>
        );
    }
}

export default AddBook;