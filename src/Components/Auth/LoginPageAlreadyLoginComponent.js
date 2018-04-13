import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class LoginPageAlreadyLoginComponent extends Component {
    render() {
        console.log(this.props.handleClick);
        return (
            <div className={DOMClassNames().loginAlready}>
                <h2>You already loggined!</h2>
                <p>You successul loggen previously, so you does not need to login again, just go ahead:</p>
                <button name="redirect-employers" 
                        className={DOMClassNames().loginRedirectToEmployers} 
                        onClick={this.props.handleClick}>
                    Go to the Employers List!
                </button>
            </div>
        )
    }
}

export default LoginPageAlreadyLoginComponent;