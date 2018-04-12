const changeError = (status) => {

    let target = document.querySelector('.modal-footer');

    let div = document.createElement('div'); 
    div.className = 'change-error';
    
    let p = document.createElement('p'); 
    
    if (status === false) {
        p.innerHTML = 'Oops! Something wrong. Try again later.'
    }

    if (!document.querySelector('.change-error') && target !== null) {
        div.appendChild(p);
        target.appendChild(div);
    }

    setTimeout(() => {
        div.classList.add('login-error-hide');
    }, 2000);

    setTimeout(() => {
        div.remove();
    }, 2500);
};

export default changeError;