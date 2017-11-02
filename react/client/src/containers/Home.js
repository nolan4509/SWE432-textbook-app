import React, { Component } from 'react';
import './style.css';

class Home extends Component {

    constructor() {
        super();
        this.state = { //set initial state
            value: '',
        };
        this.searchForCourseChange = this.searchForCourseChange.bind(this);
        this.searchForCourseSubmit = this.searchForCourseSubmit.bind(this);
    }

    componentDidMount() {
        let courseName = document.getElementById('courseSearch');

        fetch('/courses/:courseCode/:courseLevel') //fetch + api call
        .then(results => {
            return results.json(); //results - usually json
            })

            this.setState({value: results}); //set the state with this.setState
            console.log("state", this.state.value); 
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    searchForCourseSubmit(event){
        alert('submitted' + this.state.value)
    }

    searchForCourseChange(event){
        this.setState({value: event.target.value});
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
                        <button>My Books</button>
                    </div>
                </header>
                <br/>
                {this.props.children}
                <div id="searchForCourseForm">
                    <form onSubmit={this.searchForCourse}>
                        {/* <h1>Search For Course:</h1> */}
                        <label htmlFor="courseSearch">Search For Course:</label> <br/>
                        <input pattern="[A-Za-z0-9]" id="courseSearch" type="text" placeholder="ex. 'CS100'" value={this.state.value}/>
                    </form>
                </div>
                <br/>
            </div>
        );
    }
}

export default Home;