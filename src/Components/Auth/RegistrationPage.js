import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import registrationError from '../../Modules/RegistrationError'
import registrationWaitRes from '../../Modules/RegistrationWaitRes';
import regPassChecker from '../../Modules/RegPassChecker';
import Preloader from '../Preloader/Preloader'
import preloaderRunner from '../../Modules/PreloaderRunner'
import axios from 'axios';

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
                    console.log('Logout successful!');
                    setTimeout(() => 
                        this.setState({ navigate: false }), 
                        2000);
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
        registrationError(null);
        registrationWaitRes(null);
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
                ? <div className="registred-already">
                    <div className="registred-already-text col-lg-9 mx-auto d-flex flex-column justify-content-center text-center align-items-center">
                        <h1>You are already registered!</h1>
                        <p>To register an another account - please, make logout first.</p>
                    </div>
                    <div className="registred-already-buttons d-flex row align-items-center align-middle justify-content-center">
                        <p>Click the button to logout</p>
                        <button onClick={this.handleClick} className="btn btn-success">Logout</button>
                    </div>
                  </div>
                : <div className="container py-5">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-center mb-5">Registration new User</h1>
                            <div className="col-lg-12 pr-0 pl-0">
                                <div className="col pr-0 pl-0">
                                    <div className="card border-secondary">
                                        <div className="card-header">
                                            <h3 className="mb-0 my-2">Sign Up</h3>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="form" role="form" autoComplete="off">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Name</label>
                                                    <input name="username" type="text" className="form-control" id="inputName" placeholder="full name" required/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputEmail3">Email</label>
                                                    <input name="email" type="email" className="form-control" id="inputEmail3" placeholder="email@gmail.com" required/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputPassword3">Password</label>
                                                    <input value={this.state.passValue  || ''} name="password" type="password" className="form-control" id="inputPassword3" min="5" placeholder="password" title="At least 6 characters with letters and numbers" required/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputVerify3">Verify</label>
                                                    <input value={this.state.passValueConf  || ''} name="passwordConf" type="password" className="form-control" id="inputVerify3" min="5" placeholder="password (again)" required/>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-success btn-lg float-right">Register</button>
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