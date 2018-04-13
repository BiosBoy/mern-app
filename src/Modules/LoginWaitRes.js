const loginWaitRes = (status) => {
    console.log('Waiting for the server loggining answer...');
    let form = document.querySelector('form');

    let div = document.createElement('div'); 
    div.classList.add('loader-mini', 'login-wait');
    
    let p = document.createElement('p'); 
    p.innerHTML = ''

    if (!document.querySelector('.login-wait') && status === false) {
        div.appendChild(p);
        form.appendChild(div);
    } else if (document.querySelector('.login-wait') && status === true) {
        document.querySelector('.login-wait').remove();
    }
};

export default loginWaitRes;