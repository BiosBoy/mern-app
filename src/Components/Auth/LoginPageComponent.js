import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class LoginPageComponent extends Component {
    render() {
        return (
            <div className={DOMClassNames().loginForm}>
                <h1>This is the Auth Page!</h1>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email_login">E-mail</label>
                        <input name="email" type="email" className={DOMClassNames().emailLogin} aria-describedby="emailHelp" placeholder="Enter email" required />
                        <small id="emailHelp" className={DOMClassNames().loginText}>We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_login">Password</label>
                        <input name="password" type="password" className={DOMClassNames().passwordLogin} placeholder="Password" required />
                    </div>
                    <button type="submit" className={DOMClassNames().loginButton}>Submit</button>
                </form>
                <div className={DOMClassNames().loginRedirToRegist}>
                    <span className={DOMClassNames().loginRedirToRegistText}>Still does not have an account?</span> 
                    <button name="redirect-registration" className={DOMClassNames().loginRedirToRegistButton} onClick={this.props.handleClick}>Sign up now!</button>
                </div>
            </div>
        )
    }
}

export default LoginPageComponent;