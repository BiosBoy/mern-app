import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import registrationError from '../../Modules/RegistrationError'
import registrationWaitRes from '../../Modules/RegistrationWaitRes';
import regPassChecker from '../../Modules/RegPassChecker';
import preloaderRunner from '../../Modules/PreloaderRunner'
import Header from  '../Header/Header';
import RegistrationPageAlreadeRegComponent from './RegistrationPageAlreadeRegComponent';
import RegistrationPageComponent from './RegistrationPageComponent'
import Footer from '../Footer/Footer';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            redirection: false,
            registrationError: false,
            registrationAgain: false,
            passValue: '',
            passValueConf: ''
        }
    }

    handleClick = () => {
        axios.get('http://localhost:3016/auth/logout', {withCredentials: true})
            .then(() => {
                    preloaderRunner();
                    console.log('Logout successful!');
                    setTimeout(() => 
                        this.setState({ navigate: false }), 
                        1000);
                }
            )
            .catch(err => {
                console.error(err);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (regPassChecker(e.target, this.state.passValue, this.state.passValueConf) === false) 
        return e.stopPropagation();

        let userRegistration = {
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
            passwordConf: e.target.passwordConf.value,
        }

        axios.post('http://localhost:3016/auth/registration', userRegistration, {withCredentials: true})
            .then(res => {
                if (res.data === 'The users with this email already exist!') {
                    console.log('The users with this email already exist! Try another');
                    let form = document.querySelector('form');
                    registrationWaitRes(true);
                    registrationError(form, true, true);
                } else {
                    console.log('Registration successful! New User added.');
                    let form = document.querySelector('form');
                    registrationWaitRes(true);
                    registrationError(form, true);
                    setTimeout(() => {
                        this.props.history.push('/auth/login');
                        this.setState({
                            redirection: true,
                            registrationError: true
                        });
                    }, 2000);
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    registrationError: true
                });
            });
        
        if (!this.state.loginError) {
            registrationWaitRes(false);
        }

    };

    handleChange = (e) => {
        let target = e.target;
        let closestPass =  target.closest('input[name=password]');
        let closestPassConf =  target.closest('input[name=passwordConf]');

        if (closestPass) {
            console.log(closestPass.value);
            this.setState({
                passValue: closestPass.value
            });
        } else if (closestPassConf) {
            console.log(closestPassConf.value);
            this.setState({
                passValueConf: closestPassConf.value
            })
        }
    } 

    componentDidUpdate() {
        if (this.state.RegistrationError) {
            let form = document.querySelector('form');
            registrationError(form, false);
            registrationWaitRes(true);
            this.setState({
                registrationError: false
            });
        }
    }

    componentDidMount() {
        preloaderRunner();

        axios.get('http://localhost:3016/auth/registration', {withCredentials: true})
            .then(res => {
                if (res.data === undefined || typeof res.data !== 'string') {
                    console.log('User does not logged. You can add new User now!');
                    return
                } else if (typeof res.data === 'string') {
                    console.log('User alredy logged. Please, logout first! User ID: ', res.data);
                    this.setState({
                        navigate: true
                    });
                }
            })
            .catch(err => console.log(err)); 
    }

    componentWillUnmount() {
        this.handleClick === null;
        this.handleSubmit === null;
    };

    render() {
        if (this.state.registrationError) {
            return <Redirect to="/auth/login" />
        } 

        if (this.state.registrationAgain) {
            return <Redirect to="/auth/registration" />
        } 
        return (
            <Fragment>
                <Header/>
                {this.state.navigate 
                ? <RegistrationPageAlreadeRegComponent
                    handleClick={this.handleClick}
                />
                : <RegistrationPageComponent
                    passValue={this.state.passValue}
                    passValueConf={this.state.passValueConf}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                />}
                <Footer/>
            </Fragment>
        )
    }
}

export default RegistrationPage;