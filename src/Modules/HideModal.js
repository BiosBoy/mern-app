import GetNewParams from './GetNewParams'
import changeWaitRes from './ChangeWaitRes';
import DOMClassNames from '../Variables/DOMClassNames'

let HideModal = (id, targetContainer, onCommentUpdate, target) => {
    let closestHideX = target.closest('button[name=closeX]');
    let closestHide = target.closest('button[name=close]');
    let closestSave = target.closest('button[name=save]');

    if (closestHideX || closestHide) {
        let modal = document.querySelector('.modal');
        let modalDialog = document.querySelector('.modal-dialog');
        modal.classList.remove(DOMClassNames().modalShow, DOMClassNames().modalOpacityShow, DOMClassNames().modalfadeBackground);
        modalDialog.classList.remove(DOMClassNames().modalDialogMargin);
        document.querySelector('.containerModal').remove();
        console.log('Employer updation had cancel! Employer ID: ', id);
    } else if (closestSave) {
        changeWaitRes(closestSave.parentNode, false);
        console.log('Employer update clicked! Employer ID: ', id);
        let employer = GetNewParams();
        onCommentUpdate(id, employer);
    } else {
        return;
    }
}

export default HideModal;