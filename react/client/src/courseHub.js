import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom'

class CourseHub extends Component {
    render() {
        return (
            <div>
                {/* Course Hub */}
                <meta charSet="utf-8"/>
                <title>Course Home</title> {/* Will want this to be something like 'CS100 Home' */}
                <header>
                    <h1>Course Home</h1>
                    <div id="topCourseHubButtons">
                        <button id="backHomeButton">Back Home</button>
                    </div>
                </header>
                <div id="searchForNewCourse">
                    <label htmlFor="newCourseSearch"><strong>Search for New Course: </strong></label>
                    <input pattern="[A-Za-z0-9]" id="newCourseSearch" type="text" placeholder="ex. 'CS100'"/>
                </div>
                <div id="courseBooksTable">
                    <h3>Books for CS100</h3> {/*This will be Books for [COURSENAME]*/}
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
                            <td>Introduction to CS</td>
                            <td>John Doe</td>
                            <td>3rd</td>
                            <td>1234567890</td>
                            <td>Great</td>
                            <td>$30.00</td>
                            <td>
                                <button id="emailSellerButton1">Email Seller</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Introduction to CS</td>
                            <td>John Doe</td>
                            <td>3rd</td>
                            <td>1234567890</td>
                            <td>Good</td>
                            <td>$25.00</td>
                            <td>
                                <button id="emailSellerButton2">Email Seller</button>
                            </td>
                            {/*This is the same book but as if there was a second person as well trying to sell it for less and a slightly worse condition*/}
                        </tr>
                        <tr>
                            <td>Beginning CS</td>
                            <td>Bob Mac</td>
                            <td>7th</td>
                            <td>4561237890</td>
                            <td>New</td>
                            <td>$50.00</td>
                            <td>
                                <button id="emailSellerButton3">Email Seller</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/emailSeller'>Email Seller Page</Link></li>
                </nav>
            </div>
        );
    }
}

export default CourseHub;