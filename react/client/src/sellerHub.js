import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.css';

class SellerHub extends Component {
    render() {
        return (
            <div>
                {/* Seller Hub */}
                <meta charSet="utf-8"/>
                <title>My Books</title>
                <header>
                    <h1>My Books</h1>
                    <div id="topSellerHubButtons">
                        <button id="returnHomeButton">Back Home</button>
                        <button id="newBookButton">New Book</button>
                    </div>
                </header>
                <br/>
                <div id="pendingBooksTable">
                    <h3>Books I'm Selling:</h3>
                    <table>
                        <thead>
                        <tr>
                            <td>Title:</td>
                            <td>Author:</td>
                            <td>Course:</td>
                            <td>Status:</td>
                            <td>Edit:</td>
                            <td>Remove?</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Introduction to CS</td>
                            <td>John Doe</td>
                            <td>CS100</td>
                            <td>No Requests</td>
                            <td>
                                <button id="editBookButton1">Edit Info</button>
                            </td>
                            {/* will need to be careful later on with people being able to edit the book info or price while there are active requests */}
                            <td>
                                <button id="removeBookButton1">Remove</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Advanced Topics in CS</td>
                            <td>Nate Smith</td>
                            <td>CS400</td>
                            <td>2 Requests</td>
                            {/*maybe make the number '2' clickable to bring them to a requests page? */}
                            <td>
                                <button id="editBookButton2">Edit Info</button>
                            </td>
                            <td>
                                <button id="emailSellerButton2">Remove</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Useless Information to CS Majors about Music</td>
                            <td>Jane Doe</td>
                            <td>MUSI103</td>
                            <td>1 Request</td>
                            <td>
                                <button id="editBookButton3">Edit Info</button>
                            </td>
                            <td>
                                <button id="emailSellerButton3">Remove</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/addBook'>Add Books Page</Link></li>
                </nav>
            </div>
        );
    }
}
export default SellerHub;