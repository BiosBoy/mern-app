import React, { Component, Fragment } from 'react';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import loginError from '../../Modules/LoginError';
import loginWaitRes from '../../Modules/LoginWaitRes';
import preloaderRunner from '../../Modules/PreloaderRunner';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            loginError: false,
            redirectEmployers: false,
            redirectRegistration: false
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let target = e.target;

        let userLogin = {
            logemail: e.target.email.value,
            logpassword: e.target.password.value
        }

        axios.post('http://mern-app-sviatkuzh.herokuapp.com:3016/auth/login', userLogin, {withCredentials: true})
            .then(() => {
                console.log('User loged successful! Redirection on the Employers page...');
                let form = document.querySelector('form');
                loginError(form, true);
                console.log('this.props.history PUSHED');
                this.props.history.push("/employers");
                this.setState({
                    loginError: true
                });    
                setTimeout(() => {
                    this.setState({
                        redirectEmployers: true
                    });                   
                }, 2000);
            })
            .catch(err => {
                    let form = document.querySelector('form');
                    if (err.message === 'Request failed with status code 401') {
                        loginError(form, false);
                    } else {
                        loginError(form, true, true);  
                    }
                    console.log(err.message);
                    this.setState({
                        loginError: true
                    });
            });
        
        if (!this.state.loginError) {
            loginWaitRes(false);
        }
    };

    handleClick = (e) => {
        let target = e.target;
        let closestEmploy = target.closest('button[name=redirect-employers]');
        let closestRegist = target.closest('button[name=redirect-registration]');

        if (closestEmploy) {
            console.log('this.props.history PUSHED');
            this.props.history.push("/employers");
            this.setState({
                redirectEmployers: true
            });
        } else if (closestRegist) {
            this.setState({
                redirectRegistration: true
            });
            this.props.history.push("/auth/registration");
        }
    };

    componentDidUpdate() {
        if (this.state.loginError) {
            let form = document.querySelector('form');
            loginError(form, true, true);
            loginWaitRes(true);
            this.setState({
                loginError: false
            });
        }
    };

    componentDidMount() {
        preloaderRunner();
        axios.get('http://mern-app-sviatkuzh.herokuapp.com/auth/login', {withCredentials: true})
            .then(res => {
                if (res.data === undefined || res.data === '') {
                    console.log('User does not loggined. Login now!');
                    return
                } else {
                    console.log('User alerady loggined! User ID: ', res.data);
                    this.setState({
                        navigate: true
                    });
                }
            })
            .catch(err => console.log(err)); 
    };

    componentWillUnmount() {
        this.handleClick === null;
        this.handleSubmit === null;
    };


    render() {
        if (this.state.redirectEmployers) {
            return <Redirect to="/employers" />
        } 
        else if (this.state.redirectRegistration) {
            return <Redirect to="/auth/registration" />
        }
        return (
            <Fragment>
                <Header/>
                {this.state.navigate === true
                ? <div className="login-already col-lg-9 mx-auto d-flex flex-column justify-content-center text-center align-items-center">
                    <h2>You already loggined!</h2>
                    <p>You successul loggen previously, so you does not need to login again, just go ahead:</p>
                    <button name="redirect-employers" className="btn btn-success mr-1" onClick={this.handleClick}>Go to the Employers List!</button>
                  </div>
                : <div className="login-form">
                    <h1>This is the Auth Page!</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email_login">E-mail</label>
                            <input name="email" type="email" className="form-control email_login"  aria-describedby="emailHelp" placeholder="Enter email" required />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_login">Password</label>
                            <input name="password" type="password" className="form-control password_login" placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <div className="d-flex justify-content-end align-items-center mt-4">
                        <span className="mr-2">Still does not have an account?</span> 
                        <button name="redirect-registration" className="btn btn-outline-secondary" onClick={this.handleClick}>Sign up now!</button>
                    </div>
                </div>}
                <Footer/>
            </Fragment>
        )
    }
}

export default LoginPage;
