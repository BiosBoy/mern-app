const deleteError = (target, status) => {
    console.log(target);

    let div = document.createElement('div'); 
    div.className = 'login-error';
    
    let p = document.createElement('p'); 
    
    if (status === false) {
        p.innerHTML = 'Oops! Something wrong. Try again later.'
    }

    if (!document.querySelector('.login-error') && target !== null) {
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

export default deleteError;