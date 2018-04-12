import React, { Component } from 'react';
import Employer from './Employer';
import axios from 'axios';
import DOMClassNames from '../../Variables/DOMClassNames'

class EmployersList extends Component {
    componentDidMount() {
        axios.get('http://localhost:3016/')
            .then(() => {
                console.log('Connection established. Employers list: ', this.props.employers);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        let commentNodes = this.props.employers.map((employer, index) => {
            return (
                <Employer
                    key = { employer._id }
                    index = { index }
                    id = { employer._id }
                    first_name = { employer.first_name }
                    last_name = { employer.last_name }
                    birth_date = { employer.birth_date }
                    salary = { employer.salary }
                    onCommentDelete = { this.props.onCommentDelete }
                    onCommentUpdate = { this.props.onCommentUpdate }
                    />
            )
        })
        return (
            <div className={DOMClassNames().employersListContainer}>
                { commentNodes }
            </div>
        )
    }
}

export default EmployersList;
