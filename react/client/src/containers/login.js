import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../style.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.state = {
            userID: '',
            userName: '',
            email: ''
        }
    }

    homeClick = () => {
        this.props.history.push("/home")
    }

    login = () => {

        fetch(`/add/user/${this.state.userName}/${this.state.userID}/${this.state.email}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(alert('Post request sent to server.'))
            .catch((ex) => {
                console.log('parsing failed', ex)
            })

        this.props.history.push("/home")
    }

    handleChangeEmail(event) {
        this.setState({
            email : event.target.value,
            userID : event.target.value.substr(0, event.target.value.indexOf('@'))
        })
    }

    handleChangeName(event) {
        this.setState({
            userName : event.target.value
        })
    }

    render() {
        return (
            <div>
                {/* Login */}
                <meta charSet="utf-8"/>
                <title>Login</title>
                <header>
                    <h1>Sign In</h1>
                </header>
                <div id="loginForm">
                    <form onSubmit={this.login}>
                        <div>
                            <label htmlFor="userName">First Name: </label>
                            <input id="userName" type="text" placeholder="Ex. 'John'" required
                                value={this.state.userName} onChange={this.handleChangeName}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input id="email" type="email" placeholder="Enter your Email" required
                                value={this.state.email} onChange={this.handleChangeEmail}/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input id="password" type="password" placeholder="Enter your password"/>
                        </div>
                        <br/>
                        <button id="loginButton">Login</button>
                    </form>
                </div>
                <br/>
                <p>NAV LINKS</p>
                <nav>
                    <li><Link to='/home'>Home</Link></li>
                </nav>
            </div>
        );
    }
}

export default Login;