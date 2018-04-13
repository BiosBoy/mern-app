import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DOMClassNames from '../../Variables/DOMClassNames'
import Header from  '../Header/Header';
import Footer from '../Footer/Footer';
import preloaderRunner from '../../Modules/PreloaderRunner'

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
                <div className={DOMClassNames().employersLogout}>
                    <div className={DOMClassNames().employersLogoutText}>
                        <h1>You succeessfully logouted!</h1>
                        <p>You will be redirected to the main page shortly</p>
                    </div>
                    <div className={DOMClassNames().employersLogoutButtons}>
                        <p>Manual redirection</p>
                        <button className={DOMClassNames().employersLogoutButton} onClick={this.handleClick}>Go now</button>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

export default LogoutPage;