import React, { Component } from 'react';
import UpdateContent from '../../Modules/UpdateContent'
import HideModal from '../../Modules/HideModal'
import DOMClassNames from '../../Variables/DOMClassNames'

class ModalWindow extends Component {
    handleClick = (e) => {
        let target = e.target;
        HideModal(this.props.id, this.props.targetContainer, this.props.onCommentUpdate, target);
    }

    render() {
        return ( 
            <div onClick={this.handleClick} className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Employer Data Changing</h5>
                            <button name="closeX" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                           
                        </div>
                        <div className="modal-footer">
                            <button name='close' type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button name='save' type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalWindow;