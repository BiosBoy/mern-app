import registrationError from './RegistrationError'

const regPassChecker = (target, inputValue, inputConfValue) => {
    if (!inputValue.match(/\d.*\w|\w.*\d/g) && inputValue.length < 6) {
        console.log('Password must contain atleast 6 characters and consist of letters and digits!');

        let passInput = document.querySelector('input[name=password]');
        passInput.style.borderColor = 'red';
        registrationError(target, true, true, true);

        return false;
    } else if (inputValue !== inputConfValue) {
        let passInput = document.querySelector('input[name=password]');
        passInput.style.borderColor = 'red';

        let passInputConf = document.querySelector('input[name=passwordConf]');
        passInputConf.style.borderColor = 'red';
        
        registrationError(target, true, true, true, true);
        return false;
    } else {
        console.log('Password strange is normal!');
        return true;
    }
};

export default regPassChecker;