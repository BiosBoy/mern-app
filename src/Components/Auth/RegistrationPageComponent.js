import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class RegistrationPageComponent extends Component {
    render() {
        return (
            <div className={DOMClassNames().RegistrationContainer}>
                <div className={DOMClassNames().RegistrationContainerRow}>
                    <div className={DOMClassNames().RegistrationRowCol}>
                        <h1 className={DOMClassNames().RegistrationColH1}>Registration new User</h1>
                        <div className={DOMClassNames().RegistrationColLg12}>
                            <div className={DOMClassNames().RegistrationCol}>
                                <div className={DOMClassNames().RegistrationCard}>
                                    <div className={DOMClassNames().RegistrationCardHeader}>
                                        <h3 className={DOMClassNames().RegistrationCardHeaderH3}>Sign Up</h3>
                                    </div>
                                    <div className={DOMClassNames().RegistrationCardBody}>
                                        <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange} className="form"  autoComplete="off">
                                            <div className={DOMClassNames().RegistrationFormGroup}>
                                                <label htmlFor="inputName">Name</label>
                                                <input name="username" type="text" className={DOMClassNames().RegistrationFormControl} id="inputName" placeholder="full name" required/>
                                            </div>
                                            <div className={DOMClassNames().RegistrationFormGroup}>
                                                <label htmlFor="inputEmail3">Email</label>
                                                <input name="email" type="email" className={DOMClassNames().RegistrationFormControl} id="inputEmail3" placeholder="email@gmail.com" required/>
                                            </div>
                                            <div className={DOMClassNames().RegistrationFormGroup}>
                                                <label htmlFor="inputPassword3">Password</label>
                                                <input value={this.props.passValue  || ''} name="password" type="password" className={DOMClassNames().RegistrationFormControl} id="inputPassword3" min="5" placeholder="password" title="At least 6 characters with letters and numbers" required/>
                                            </div>
                                            <div className={DOMClassNames().RegistrationFormGroup}>
                                                <label htmlFor="inputVerify3">Verify</label>
                                                <input value={this.props.passValueConf  || ''} name="passwordConf" type="password" className={DOMClassNames().RegistrationFormControl} id="inputVerify3" min="5" placeholder="password (again)" required/>
                                            </div>
                                            <div className={DOMClassNames().RegistrationFormGroup}>
                                                <button type="submit" className={DOMClassNames().RegistrationFormButton}>Register</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationPageComponent;