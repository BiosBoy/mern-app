const loginError = (target, status, status_exist) => {
    let div = document.createElement('div'); 
    div.className = 'login-error';
    
    let p = document.createElement('p'); 
    
    if (status === false) {
        p.innerHTML = 'Login or password is incorrect'
        p.style.color = 'red';
        console.log('Loginning failed. Check your Login or Password!');
    } else if (status === true && status_exist === true) {
        p.innerHTML = 'Ooops! Something goes wrong. Go fast to administrator!'
        p.style.color = 'red';
        console.log('There is a problem on the server-side. Try again later!');
    } else if (status === true) {
        p.innerHTML = 'Login is successful!'
        p.classList.add('login-error-success');
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

export default loginError;