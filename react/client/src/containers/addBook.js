import React, { Component } from 'react';
import './style.css';

class AddBook extends Component {
    render() {
        return (
            <div>
                {/* New Book */}
                <meta charSet="utf-8"/>
                <title>Add Book</title>
                <header>
                    <h1>Add Book</h1>
                    <div id="newBookForm">
                        <div
                            id="isbnLookup"> {/* this is the call to isbndb.com to try and fill out the fields in the book info form */}
                            <form action="/" method="post">
                                <label htmlFor="isbnField">Know the ISBN? </label>
                                <input pattern="[0-9{13}]" id="isbnField" type="text" placeholder="ex. '1234567890'"/>
                                <button id="searchForIsbn">Search</button>
                            </form>
                        </div>
                    </div>
                </header>
                <br/>
                <br/>
                <div id="bookInfoForm">
                    <h3>New Book:</h3>
                    <form action="/sellerHub" method="post">
                        <div>
                            <label htmlFor="titleField">*Title: </label>
                            <input pattern="[A-Za-z0-9]" id="titleField" type="text" required/>
                        </div>
                        <div>
                            <label htmlFor="authorField">*Author: </label>
                            <input pattern="[A-Za-z]" id="authorField" type="text" required/>
                        </div>
                        <div>
                            <label htmlFor="editionField">*Edition: </label>
                            <input pattern="[A-Za-z0-9]" id="editionField" type="text" placeholder="ex. '5th'"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="publisherField">Publisher: </label>
                            <input pattern="[A-Za-z0-9]" id="publisherField" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="copyrightField">Copyright: </label>
                            <input pattern="[A-Za-z0-9]" id="copyrightField" type="number"/>
                        </div>
                        <div>
                            <label htmlFor="commentsField">Comments: </label>
                            <textarea id="commentsField" rows={5} cols={25} defaultValue={""}/>
                        </div>
                        <div>
                            <label htmlFor="courseField">*Course: </label>
                            <input pattern="[A-Za-z0-9]" id="courseField" type="text" placeholder="ex. 'CS100'"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="conditionField">*Condition: </label>
                            <input pattern="[A-Za-z]" id="conditionField" type="text" placeholder="ex. 'Great'"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="priceField">*Price: $</label>
                            <input pattern="[0-9.0-9{2}]" id="priceField" type="number" placeholder="ex. '30.50'"
                                   required/>
                        </div>
                        <button id="postBookButton">Post Book</button>
                    </form>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/sellerHub'>My Books Page</Link></li>
                </nav>
            </div>
        );
    }
}

export default AddBook;