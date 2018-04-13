const registrationWaitRes = (status) => {
    let form = document.querySelector('form');

    let div = document.createElement('div'); 
    div.classList.add('loader-mini', 'login-wait');
    
    let p = document.createElement('p'); 
    p.innerHTML = ''

    if (!document.querySelector('.login-wait') && status === false) {
        console.log('Waiting for the server registration answer...');
        
        div.appendChild(p);
        form.appendChild(div);
    } else if (document.querySelector('.login-wait') && status === true) {
        document.querySelector('.login-wait').remove();
    }
};

export default registrationWaitRes;