const registrationError = (target, status, status_exist, pass, passConf) => {
    let div = document.createElement('div'); 
    div.className = 'registration-error';
    div.style.clear = 'both';
    div.style.display = 'block';
    div.style.maxWidth = '247px';
    div.style.cssFloat = 'left';
    div.style.position = 'absolute';
    
    let p = document.createElement('p'); 
    
    if (status === false) {
        p.innerHTML = 'Ooops! Something goes wrong. Go fast to administrator!'
        p.style.color = 'red';
        
    }  else if (status === true && status_exist === true && pass === true && passConf === true) {
        p.innerHTML = 'Passwords are not equal! Repeat passwords.'
        p.style.color = 'red';
    }  else if (status === true && status_exist === true && pass === true) {
        p.innerHTML = 'Weak password! Must contain 6 character min. of a-z and 0-9!'
        p.style.color = 'red';
    } else if (status === true && status_exist === true) {
        p.innerHTML = 'This email is alredy taken, try another one!'
        p.style.color = 'red';
    } else if (status === true) {
        p.innerHTML = 'Registration is successful!'
        p.style.color = 'green';
    } 

    if (!document.querySelector('.registration-error') && target !== null) {
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

export default registrationError;