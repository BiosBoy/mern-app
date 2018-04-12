const deleteWaitRes = (targetContainer, status) => {
    console.log('deleteWaitRes', targetContainer);
    let targetContainerCoordBottom = targetContainer.getBoundingClientRect().bottom;
    let div = document.createElement('div'); 
    div.classList.add('loader-mini', 'loader-wait-delete-employer');
    
    let p = document.createElement('p'); 
    p.innerHTML = ''

    if (!document.querySelector('.loader-wait-delete-employer') && status === false) {
        div.appendChild(p);
        targetContainer.appendChild(div);
    } else if (document.querySelector('.loader-wait-delete-employer') && status === true) {
        document.querySelector('.loader-wait-delete-employer').remove();
    }
};

export default deleteWaitRes;