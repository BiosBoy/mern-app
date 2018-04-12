import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DOMClassNames from '../../Variables/DOMClassNames'

class EmployerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirection: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let target = e.target.elements;

        let first_name = target.first_name.value;
        let last_name = target.last_name.value;
        let birth_date = target.birth_date.value;
        let salary = target.salary.value;
        let _id = '1231231231230';


        if (!first_name || !last_name || !birth_date || !salary) {
            return;
        }

        this.props.onCommentSubmit({ first_name, last_name, birth_date, salary, _id });
    
        target.first_name.value = '';
        target.last_name.value = '';
        target.birth_date.value = '';
        target.salary.value = '';
    }

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
                <div className="logout-form d-flex justify-content-center align-items-center">
                    <div className="logout-form-content">
                        <p>Want to logout? Just click on the button below</p>
                    </div>
                    <button onClick={this.props.handleClick} name="logout" className="btn btn-outline-secondary btn-sm">Logout</button>
                </div>
            </Fragment>
        )
    }
}

export default EmployerForm;