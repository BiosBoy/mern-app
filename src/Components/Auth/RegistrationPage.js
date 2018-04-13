import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DOMClassNames from '../../Variables/DOMClassNames'
import registrationError from '../../Modules/RegistrationError'
import registrationWaitRes from '../../Modules/RegistrationWaitRes';
import regPassChecker from '../../Modules/RegPassChecker';
import preloaderRunner from '../../Modules/PreloaderRunner'
import Header from  '../Header/Header';
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
                ? <div className={DOMClassNames().logoutRegisteredAlready}>
                    <div className={DOMClassNames().logoutRegisteredAlreadyText}>
                        <h1>You are already registered!</h1>
                        <p>To register an another account - please, make logout first.</p>
                    </div>
                    <div className={DOMClassNames().logoutRegisteredAlreadyButtons}>
                        <p>Click the button to logout</p>
                        <button onClick={this.handleClick} className={DOMClassNames().logoutRegisteredAlreadyButton}>Logout</button>
                    </div>
                  </div>
                : <div className={DOMClassNames().RegistrationContainer}>
                    <div className={DOMClassNames().RegistrationContainerRow}>
                        <div className={DOMClassNames().RegistrationRowCol}>
                            <h1 className={DOMClassNames().RegistrationColH1}>Registration new User</h1>
                            <div className={DOMClassNames().RegistrationColLg12}>
                                <div className={DOMClassNames().RegistrationCol}>
                                    <div className={DOMClassNames().RegistrationCard}>
                                        <div className={DOMClassNames().RegistrationCardHeader}>
                                            <h3 className={DOMClassNames().RegistrationCardHeaderH3}>Sign Up</h3>
                                        </div>
                                        <div className={DOMClassNames().RegistrationCardBody}>
                                            <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="form"  autoComplete="off">
                                                <div className={DOMClassNames().RegistrationFormGroup}>
                                                    <label htmlFor="inputName">Name</label>
                                                    <input name="username" type="text" className={DOMClassNames().RegistrationFormControl} id="inputName" placeholder="full name" required/>
                                                </div>
                                                <div className={DOMClassNames().RegistrationFormGroup}>
                                                    <label htmlFor="inputEmail3">Email</label>
                                                    <input name="email" type="email" className={DOMClassNames().RegistrationFormControl} id="inputEmail3" placeholder="email@gmail.com" required/>
                                                </div>
                                                <div className={DOMClassNames().RegistrationFormGroup}>
                                                    <label htmlFor="inputPassword3">Password</label>
                                                    <input value={this.state.passValue  || ''} name="password" type="password" className={DOMClassNames().RegistrationFormControl} id="inputPassword3" min="5" placeholder="password" title="At least 6 characters with letters and numbers" required/>
                                                </div>
                                                <div className={DOMClassNames().RegistrationFormGroup}>
                                                    <label htmlFor="inputVerify3">Verify</label>
                                                    <input value={this.state.passValueConf  || ''} name="passwordConf" type="password" className={DOMClassNames().RegistrationFormControl} id="inputVerify3" min="5" placeholder="password (again)" required/>
                                                </div>
                                                <div className={DOMClassNames().RegistrationFormGroup}>
                                                    <button type="submit" className={DOMClassNames().RegistrationFormButton}>Register</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <Footer/>
            </Fragment>
        )
    }
}

export default RegistrationPage;