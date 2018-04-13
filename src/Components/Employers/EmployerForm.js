import React, { Component, Fragment } from 'react';
import EmployerFormComponent from './EmployerFormComponent'

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
                <EmployerFormComponent handleSubmit={this.handleSubmit} handleClick={this.props.handleClick} />
            </Fragment>
        )
    }
}

export default EmployerForm;