import React, { Component } from 'react';
import '../style.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {course: ''}
    }
    sellerHubClick = () => { // My Books
        this.props.history.push("/sellerHub")
    }
    courseHubClick = () => { // Search Courses
        this.props.history.push("/courseHub")
    }
    handleChange(event) {
        this.setState({course: event.target.value})
    }
    render() {
        return (
            <div>
                {/* Home */}
                <meta charSet="utf-8"/>
                <title>Home</title>
                <header>
                    <h1 className="big">Home</h1>
                    <div id="myBooksButton">
                        <button onClick={this.sellerHubClick}>
                            My Books
                        </button>
                        <button onClick={this.courseHubClick}>
                            Search Courses
                        </button>
                    </div>
                </header>
                <br/>
                { /*doesnt work like it should, but not needed, on hold for now
                    <div id="searchForCourseForm">
                    <form action="/courseHub" method="get">
                        {/* <h1>Search For Course:</h1> }
                        <label htmlFor="courseSearch">Search For Course:</label> <br/>
                        <input pattern="[A-Z]{1,4}+[0-9]{3,4}]" id="courseSearch" type="text" placeholder="ex. 'CS100'"
                               value={this.state.course} onChange={this.handleChange.bind(this)}/>
                    </form>
                </div>*/}
                <br/>

            </div>
        );
    }
}

export default Home;