import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginPageComponent from './LoginPageComponent';
import LoginPageAlreadyLoginComponent from './LoginPageAlreadyLoginComponent';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import loginError from '../../Modules/LoginError';
import loginWaitRes from '../../Modules/LoginWaitRes';
import preloaderRunner from '../../Modules/PreloaderRunner';

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

        let userLogin = {
            logemail: e.target.email.value,
            logpassword: e.target.password.value
        }

        axios.post('http://localhost:3016/auth/login', userLogin, {withCredentials: true})
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
        axios.get('http://localhost:3016/auth/login', {withCredentials: true})
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
                { this.state.navigate === true
                ? <LoginPageAlreadyLoginComponent 
                    redirectEmployers={this.state.redirectEmployers} 
                    redirectRegistration={this.props.redirectEmployers} 
                    handleClick={this.handleClick}
                  />
                : <LoginPageComponent
                    redirectEmployers={this.state.redirectEmployers} 
                    redirectRegistration={this.props.redirectEmployers} 
                    handleSubmit={this.handleSubmit}
                    handleClick={this.handleClick}
                  /> }
                <Footer/>
            </Fragment>
        )
    }
}

export default LoginPage;