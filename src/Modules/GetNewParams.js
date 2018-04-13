let GetNewParams = () => {
    let tempFirst_name = document.querySelector('.tempFirst_name');
    let tempLast_name = document.querySelector('.tempLast_name');
    let tempBirth_date = document.querySelector('.tempBirth_date');
    let tempSalary = document.querySelector('.tempSalary');

    return {
        first_name: tempFirst_name.value,
        last_name: tempLast_name.value,
        birth_date: tempBirth_date.value,
        salary: tempSalary.value
    }
}


export default GetNewParams;