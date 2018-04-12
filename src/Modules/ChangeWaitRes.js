const changeWaitRes = (targetContainer, status) => {
    let div = document.createElement('div'); 
    div.classList.add('loader-mini', 'loader-wait-change-employer');
    
    let p = document.createElement('p'); 
    p.innerHTML = ''

    if (!document.querySelector('.loader-wait-change-employer') && status === false) {
        console.log('Getting responce from server about update operation...');

        div.appendChild(p);
        targetContainer.appendChild(div);
    } else if (document.querySelector('.loader-wait-change-employer') && status === true) {
        document.querySelector('.loader-wait-change-employer').remove();
    }
};

export default changeWaitRes;