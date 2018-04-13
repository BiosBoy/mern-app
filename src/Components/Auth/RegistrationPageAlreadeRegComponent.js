
import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class RegistrationPageAlreadeRegComponent extends Component {
    render() {
        return (
            <div className={DOMClassNames().logoutRegisteredAlready}>
                <div className={DOMClassNames().logoutRegisteredAlreadyText}>
                    <h1>You are already registered!</h1>
                    <p>To register an another account - please, make logout first.</p>
                </div>
                <div className={DOMClassNames().logoutRegisteredAlreadyButtons}>
                    <p>Click the button to logout</p>
                    <button onClick={this.props.handleClick} className={DOMClassNames().logoutRegisteredAlreadyButton}>Logout</button>
                </div>
            </div>
        )
    }
}

export default RegistrationPageAlreadeRegComponent;