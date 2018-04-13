import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class LogoutPageComponent extends Component {
    render() {
        return (
            <div className={DOMClassNames().employersLogout}>
                <div className={DOMClassNames().employersLogoutText}>
                    <h1>You succeessfully logouted!</h1>
                    <p>You will be redirected to the main page shortly</p>
                </div>
                <div className={DOMClassNames().employersLogoutButtons}>
                    <p>Manual redirection</p>
                    <button className={DOMClassNames().employersLogoutButton} onClick={this.props.handleClick}>Go now</button>
                </div>
            </div>
        )
    }
}

export default LogoutPageComponent;