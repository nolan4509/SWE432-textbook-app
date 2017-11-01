import React, { Component } from 'react';
import './style.css';

class Home extends Component {
    render() {
        return (
            <div>
                {/* Home */}
                <meta charSet="utf-8"/>
                <title>Home</title>
                <header>
                    <h1 className="big">Home</h1>
                    <div id="myBooksButton">
                        <button>My Books</button>
                    </div>
                </header>
                <br/>
                {this.props.children}
                <div id="searchForCourseForm">
                    <form action="/courseHub" method="get">
                        {/* <h1>Search For Course:</h1> */}
                        <label htmlFor="courseSearch">Search For Course:</label> <br/>
                        <input pattern="[A-Za-z0-9]" id="courseSearch" type="text" placeholder="ex. 'CS100'"/>
                    </form>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to="/sellerHub">My Books Page</Link></li>
                    <li><Link to="/courseHub">Search Courses</Link></li>
                </nav>
            </div>
        );
    }
}

export default Home;