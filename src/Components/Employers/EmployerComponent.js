import React, { Component, Fragment} from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'

class EmployerComponent extends Component {
    render() {
        return (
            <Fragment>
                <div className={DOMClassNames().employerContent}>
                    <span style={{fontSize: '20px'}}>{this.props.index}. </span>
                    <h5 className={DOMClassNames().employerFirstName}>{this.props.first_name} </h5>
                    <h5 className={DOMClassNames().employerLastName}>{this.props.last_name} </h5>
                    <span> Birth Date: </span>
                    <h5 className={DOMClassNames().employerBirthDate}>{this.props.birth_date}</h5>
                    <span> Salary: </span>
                    <h5 className={DOMClassNames().employerSalary}>{this.props.salary}</h5>
                </div>
                <div className={DOMClassNames().employerButtonsContainer}>
                    <button name="show" className={DOMClassNames().employerButtonChange} onClick={ this.props.updateComment }>
                        {this.props.isCliked === false ? 'update' : 'change'}
                    </button>
                    <button className={DOMClassNames().employerButtonDelete} onClick={ this.props.deleteComment }>
                        delete
                    </button>
                </div> 
            </Fragment>
        )
    }
}

export default EmployerComponent;
