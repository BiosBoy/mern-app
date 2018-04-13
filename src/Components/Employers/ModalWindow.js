import React, { Component } from 'react';
import DOMClassNames from '../../Variables/DOMClassNames'
import HideModal from '../../Modules/HideModal'

class ModalWindow extends Component {
    handleClick = (e) => {
        let target = e.target;
        HideModal(this.props.id, this.props.targetContainer, this.props.onCommentUpdate, target);
    }

    render() {
        return ( 
            <div onClick={this.handleClick} 
                className={DOMClassNames().modalWindow} id="exampleModal" 
                tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={DOMClassNames().modalWindowDialog}  role="document">
                    <div className={DOMClassNames().modalWindowContent}>
                        <div className={DOMClassNames().modalWindowContenth5}>
                            <h5 className={DOMClassNames().modalWindowContentTitle} 
                                id="exampleModalLabel">Employer Data Changing</h5>
                            <button name="closeX" type="button" 
                                className={DOMClassNames().modalWindowClose} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={DOMClassNames().modalWindowBody}></div>
                        <div className={DOMClassNames().modalWindowFooter}>
                            <button name='close' type="button" 
                                className={DOMClassNames().modalWindowFooterButtonClose} data-dismiss="modal">
                                Close
                            </button>
                            <button name='save' type="button" 
                                className={DOMClassNames().modalWindowFooterButtonSave}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalWindow;