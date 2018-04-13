import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'
import UpdateContent from '../../Modules/UpdateContent'
import ShowModal from '../../Modules/ShowModal'
import ModalWindow from './ModalWindow'

class Employer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            targetContainer: '',
            id: ''
        }
    }

    updateComment = (e) => {
        e.preventDefault();

        let target = e.target;
        let targetContainer = target.parentNode.parentNode;
        let id = targetContainer.getAttribute('id');

        this.setState({
            isClicked: true,
            targetContainer: targetContainer,
            id: id
        })

        setTimeout(() => {
            UpdateContent(targetContainer);
            ShowModal(target);
        }, 500);
    }

    deleteComment = (e) => {
        e.preventDefault();
        
        let target = e.target;
        let targetContainer = target.parentNode.parentNode;

        let targetContainerId = targetContainer.getAttribute('id');
        this.props.onCommentDelete(targetContainer, targetContainerId);
    }

    render() {
        return (
            <div className={DOMClassNames().employerContainer} id={this.props.id} >
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
                    <button name="show" className={DOMClassNames().employerButtonChange} onClick={ this.updateComment }>
                        {this.state.isCliked === false ? 'update' : 'change'}
                    </button>
                    <button className={DOMClassNames().employerButtonDelete} onClick={ this.deleteComment }>
                        delete
                    </button>
                </div>
                {this.state.isClicked === true ? <ModalWindow id={this.state.id} targetContainer={this.state.targetContainer} onCommentUpdate={this.props.onCommentUpdate} /> : null}
            </div> 
        )
    }
}

export default Employer;
