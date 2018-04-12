import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader'
import preloaderRunner from '../../Modules/PreloaderRunner'
import axios from 'axios';

class LogoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigateEmployers: false,
            navigateAuth: false
        }
    }

    handleClick = () => {
        this.setState({ 
            navigate: true 
        });
    }

    componentDidMount() {
        preloaderRunner();
        axios.get('http://localhost:3016/auth/logout', {withCredentials: true})
        .then(res => {
            if (res.data === 'User is logouted') {
                console.log('User is logouted. You can logout now!');
                setTimeout(() => {
                    this.props.history.push('/employers');
                    this.setState({ navigateEmployers: true })
                }, 2000);
            } else {
                console.log('User does not logged! Redirection on login page.');
                this.props.history.push('/auth/login');
                this.setState({ navigateAuth: true });
            }  
        })
        .catch(err => {
            console.error(err);
        });
    };

    componentWillUnmount() {
        this.handleClick === null;
    };

    render() {
        if (this.state.navigateEmployers) {
            return <Redirect to="/employers" />
        } else if (this.state.navigateAuth) {
            return <Redirect to="/auth/login" />
        }
        return (
            <Fragment>
                <Header/>
                <div className="employers-logout col-lg-9 mx-auto d-flex flex-column justify-content-center text-center align-items-center">
                    <div className="employers-logout-text">
                        <h1>You succeessfully logouted!</h1>
                        <p>You will be redirected to the main page shortly</p>
                    </div>
                    <div className="employers-logout-buttons d-flex row align-items-center align-middle justify-content-between">
                        <p>Manual redirection</p>
                        <button className="btn btn-success mr-2" onClick={this.handleClick}>Go now</button>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

export default LogoutPage;