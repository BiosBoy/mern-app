import DOMClassNames from '../Variables/DOMClassNames'

let UpdateContent = (targetContainer) => {
    console.log('Employer updating started. Employer ID: ', targetContainer.getAttribute('id'));
    let first_name = targetContainer.querySelector('.first_name');
    let last_name = targetContainer.querySelector('.last_name');
    let birth_date = targetContainer.querySelector('.birth_date');
    let salary = targetContainer.querySelector('.salary');

    let containerModal = document.createElement('div');
    containerModal.className = DOMClassNames().containerModal;

    let contentModal = document.createElement('div');
    contentModal.className = DOMClassNames().contentModal;

    let buttonsModal = document.createElement('div');
    buttonsModal.className = DOMClassNames().contentModal;

    let tempFirst_name = document.createElement('input');
    tempFirst_name.className = DOMClassNames().tempFirstName;
    tempFirst_name.value = first_name.innerHTML;
    tempFirst_name.setAttribute('type', 'text');
    
    let tempLast_name = document.createElement('input');
    tempLast_name.className = DOMClassNames().tempLastName;
    tempLast_name.value = last_name.innerHTML;
    tempLast_name.setAttribute('type', 'text');
    
    let tempBirth_date = document.createElement('input');
    tempBirth_date.className = DOMClassNames().tempBirthDate;
    tempBirth_date.value = birth_date.innerHTML;
    tempBirth_date.setAttribute('type', 'date');
    
    let tempSalary = document.createElement('input');
    tempSalary.className = DOMClassNames().tempSalary;
    tempSalary.value = salary.innerHTML;
    tempSalary.setAttribute('type', 'number');


    contentModal.appendChild(tempFirst_name);
    contentModal.appendChild(tempLast_name);
    contentModal.appendChild(tempBirth_date);
    contentModal.appendChild(tempSalary);

    containerModal.appendChild(contentModal);
    document.querySelector('.modal-body').appendChild(containerModal);
}

export default UpdateContent;