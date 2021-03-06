import React, {Component} from "react";
import './css/LogInWithEmail.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {useAlert} from 'react-alert';

export default class LoginWithEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            profile: {}
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log(localStorage.getItem('loggedIn'));
    }

    onSubmit(e) {
        e.preventDefault();

        const userCredentials = {
            email: this.state.email,
            password: this.state.password
        };
        this.setState({
            email: '',
            password: ''
        });
        axios.post('http://localhost:5000/users/login', userCredentials)
            .then(res => {
                if (res.data === "invalid password") {
                    useAlert("Sorry can you please check your credentials and try again?");
                    console.log(res);
                } else {
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem("_id", res.data._id);
                    localStorage.setItem("bio", res.data.bio);
                    this.setState((state, props) => {
                        return {
                            loggedIn: true,
                            profile: res.data
                        };
                    });
                }
            });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    render() {
        if (localStorage.getItem("loggedIn") === null || localStorage.getItem("loggedIn") === "false") {
            return (
                <div className="logInWithEmaill">
                    <div className="rectangle">
                        <a href="/"
                           className="App-name-login">
                            ⬅ 
                        </a>
                        <div className="welcomeBack">
                            Welcome<br></br>Back
                        </div>
                    </div>
                    <div className="rectangleRight">
                        <form onSubmit={this.onSubmit}>
                            <div className="emailInput">
                                <input className="emailInputForm"
                                       type="email"
                                       placeholder="Email"
                                       name="email"
                                       required onChange={this.onChangeEmail}
                                       value={this.state.email}
                                />
                            </div>
                            <div className="emailLine"/>
                            <div className="passwordInput">
                                <input className="passwordInputForm"
                                       type="password"
                                       placeholder="Password"
                                       name="password"
                                       required onChange={this.onChangePassword}
                                       value={this.state.password}
                                />
                            </div>
                            <div className="passwordLine"/>
                            <input type="submit" className="loginButton" value="Log in"/>
                        </form>
                        <div className="dontHaveAnAccount">
                            Don't have an account? <a href="./signup"><span
                            className="sign-up-button">Sign Up</span></a>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to={{
                    pathname: '/dashboard',
                    state: this.state.profile
                }}/>
            )
        }
    };
}

