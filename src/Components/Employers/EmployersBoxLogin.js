import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class EmployersBoxLogin extends Component {
    render() {
        return (
            <div onClick={this.props.handleClick} className={DOMClassNames().employersLogin}>
                <div className={DOMClassNames().employersLoginContainer}>
                    <div className={DOMClassNames().employersLoginText}>
                        <h1>You are must be logged to view this page!</h1>
                        <p>Please, coose for you one the two ways to see this page below</p>
                    </div>
                    <div className={DOMClassNames().employersLoginButtons}>
                        <button name="login" className={DOMClassNames().employersLoginButtonLogin}>
                            Login
                        </button>
                        <button name="register" className={DOMClassNames().employersLoginButtonReg}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
    
export default EmployersBoxLogin;