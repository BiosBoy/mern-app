import React, { Component, Fragment } from 'react';
import LoginPage from './LoginPage'
import LogoutPage from './LoginPage'
import RegistrationPage from './LoginPage'

class Auth extends Component {
    render() {
        return (
            <Fragment>
                {/* <LoginPage history={this.props.history} />
                <LogoutPage history={this.props.history} />
                <RegistrationPage history={this.props.history} /> */}
            </Fragment>
        )
    }
}

export default Auth;