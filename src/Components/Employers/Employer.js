import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'
import EmployerComponent from './EmployerComponent'
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
        console.log('updateComment', id, targetContainer);

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

        console.log('deleteComment', targetContainerId, targetContainer);

        this.props.onCommentDelete(targetContainer, targetContainerId);
    }

    render() {
        return (
            <div className={DOMClassNames().employerContainer} id={this.props.id} >
                <EmployerComponent 
                    index = {this.props.index}
                    first_name = {this.props.first_name}
                    last_name = {this.props.last_name}
                    birth_date = {this.props.birth_date}
                    salary = {this.props.salary}
                    isClicked={this.props.isCliked}
                    deleteComment = {this.deleteComment}
                    updateComment = {this.updateComment}
                />
                {this.state.isClicked === true ? 
                    <ModalWindow id={this.state.id} 
                                 targetContainer={this.state.targetContainer} 
                                 onCommentUpdate={this.props.onCommentUpdate} 
                    /> 
                : null}
            </div> 
        )
    }
}

export default Employer;
