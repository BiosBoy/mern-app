import React, { Component, Fragment } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class EmployerFormComponent extends Component {
    render() {
        return (
            <Fragment>
                <div className="form-add-employer">
                    <form className={DOMClassNames().employersFormContainer} onSubmit={ this.handleSubmit }>
                        <input name="first_name"  type='text' placeholder='Your Firstname…'
                            className={DOMClassNames().employerFormInput} required/>
                        <input name="last_name" type='text' placeholder='Your Surname...'
                            className={DOMClassNames().employerFormInput} required/>
                        <input name="birth_date"  type='date' placeholder='Your birth date'
                            className={DOMClassNames().employerFormInput} required/>
                        <input name="salary"  type='number' placeholder='Your salary'
                            className={DOMClassNames().employerFormInput} required/>
                        <input 
                            type='submit'
                            className={DOMClassNames().employerFormButton}
                            value='Add new Employer'/>
                    </form>
                </div>
                <div className={DOMClassNames().employersListLogoutFrom}>
                    <div className={DOMClassNames().employersListLogoutContent}>
                        <p>Want to logout? Just click on the button below</p>
                    </div>
                    <button onClick={this.props.handleClick} name="logout" 
                        className={DOMClassNames().employersListLogout}>
                        Logout
                    </button>
                </div>
            </Fragment>
        )
    }
}

export default EmployerFormComponent;