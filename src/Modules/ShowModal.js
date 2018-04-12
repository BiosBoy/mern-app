import DOMClassNames from '../Variables/DOMClassNames'

let ShowModal = (target) => {
    let closestShow = target.closest('button[name=show]');

    if (closestShow) {
        let modal = document.querySelector('.modal');
        let modalDialog = document.querySelector('.modal-dialog');
        modal.classList.add(DOMClassNames().modalShow, DOMClassNames().modalOpacityShow, DOMClassNames().modalfadeBackground);
        modalDialog.classList.add(DOMClassNames().modalDialogMargin);
    } else {
        return;
    }
}

export default ShowModal;