import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import EmployersList from './EmployersList';
import EmployerForm from './EmployerForm';
import loginError from '../../Modules/LoginError';
import deleteWaitRes from '../../Modules/DeleteWaitRes';
import deleteError from './../../Modules/DeleteWaitRes';
import changeWaitRes from '../../Modules/ChangeWaitRes';
import changeError from '../../Modules/ChangeError';
import Preloader from '../Preloader/Preloader'
import preloaderRunner from '../../Modules/PreloaderRunner'
import DOMClassNames from '../../Variables/DOMClassNames'

class EmployersBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            employers: [],
            navigate: true,
            loginRedirect: false,
            logoutRedirect: false,
            registrationRedirect: false
        };
    }

    loadCommentsFromServer = () => {
        axios.get('http://localhost:3016/employers', {withCredentials: true})
            .then(res => {
                if (res.data.sess === undefined || res.data.sess === '') {
                    this.setState({
                        employers: [],
                        navigate: true
                    });
                    // console.log('User did not loged! Login or register firstly.');
                } else if (res.data.sess.length > 3 ) {
                    // console.log('User already logged! Welcome on the Employers page. User cookies: ', res.data);
                    this.setState({
                        employers:  res.data.arr,
                        navigate: false
                    });
                }
            })
            .catch(err => console.log(err));
    };

    handleCommentSubmit = (newEmployer) => {
        this.setState({ 
            employers: this.state.employers.concat(newEmployer)
        });
        console.log('State has been updated manually! New state:', this.state.employers);

        axios.post(this.props.url, newEmployer)
            .catch(err => {
                console.error(err);
            });
    };

    handleCommentDelete = (targetContainer, id) => {
        deleteWaitRes(targetContainer, false);
        console.log('Employer will be deleted! Employer ID: ', id);
        axios.delete(`${this.props.url}/${id}`, {withCredentials: true})
            .catch(err => {
                console.error(err);
                deleteWaitRes(targetContainer, true);
                deleteError(targetContainer, false);
            });
        console.log('Employer already be deleted');

    }

    handleCommentUpdate = (id, employer) => {
        axios.put(`${this.props.url}/${id}`, employer, {withCredentials: true})
            .then(() => {
                setTimeout(() => {
                    document.querySelector('.containerModal').remove();
                    let modal = document.querySelector('.modal');
                    let modalDialog = document.querySelector('.modal-dialog');
                    modal.classList.remove(DOMClassNames().modalShow, DOMClassNames().modalOpacityShow, DOMClassNames().modalfadeBackground);
                    modalDialog.classList.remove(DOMClassNames().modalDialogMargin); 
                    changeWaitRes(null, true);                
                }, 2000);
                console.log('User update successful! User: ', id, employer);
            })
            .catch(err => {
                console.log(err);
                changeWaitRes(null, true); 
                changeError(false);
            })
    }

    handleClick = (e) => {
        let target = e.target;
        let closestLogin = target.closest('button[name=login]');
        let closestLogout = target.closest('button[name=logout]');
        let closestRegistration = target.closest('button[name=register]');

        if (closestLogin) {
            this.props.history.push('/auth/login');
            this.setState({
                loginRedirect: true
            })
        } else if (closestRegistration) {
            this.props.history.push('/auth/registration');
            this.setState({
                registrationRedirect: true
            })    
        } else if (closestLogout) {
            axios.get('http://localhost:3016/auth/logout', {withCredentials: true})
            .then(() => {
                console.log('User had been logouted! Have a nice day ;)');
                this.props.history.push('/auth/logout');
                this.setState({ 
                    logoutRedirect: true 
                });
            })
            .catch(err => {
                console.error(err);
            });
        }

    }

    componentDidMount() {
        preloaderRunner();
        this.loadCommentsFromServer();
        this.intervalID = setInterval(
            this.loadCommentsFromServer, 2000
        );
    }

    componentWillUnmount() {
        this.intervalID && clearInterval(this.intervalID);
        this.handleClick === null;
        this.handleSubmit === null;
        this.loadCommentsFromServer === null;
        this.handleCommentDelete === null;
        this.handleCommentUpdate === null;
        this.handleCommentSubmit === null;
    };

    render() {
        console.log(this.props.history);
        if (this.state.loginRedirect) {
            return <Redirect to="/auth/login" />
        } else if (this.state.registrationRedirect) {
            return <Redirect to="/auth/registration" />
        } else if (this.state.logoutRedirect) {
            return <Redirect to="/auth/login" />
        }
        return (
            <Fragment>
                <Header/>
                {this.state.navigate 
                ? <div onClick={this.handleClick}  className="employers-login">
                    <div className="employers-login col-lg-9 mx-auto d-flex flex-column justify-content-center text-center align-items-center">
                        <div className="employers-login-text">
                            <h1>You are must be logged to view this page!</h1>
                            <p>Please, coose for you one the two ways to see this page below</p>
                        </div>
                        <div className="employers-login-buttons">
                            <button name="login" className="btn btn-success mr-2">Login</button>
                            <button name="register" className="btn btn-success mr-2">Register</button>
                        </div>
                    </div>
                  </div>
                : <div className={DOMClassNames().mainContainer} >
                    <h1 className={DOMClassNames().h2Header}>Employers:</h1>
                    <EmployersList
                        onCommentDelete={ this.handleCommentDelete }
                        onCommentUpdate={ this.handleCommentUpdate }
                        employers={ this.state.employers } />
                    <EmployerForm onCommentSubmit={ this.handleCommentSubmit } handleClick={this.handleClick}/>
                </div>}
                <Footer/>
            </Fragment>
        )
    }
}
    
export default EmployersBox;