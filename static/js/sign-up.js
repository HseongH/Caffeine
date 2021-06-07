const check = document.querySelector('.check');
const inputPwd = document.getElementById('input--pwd');

function is_id(idInput) {
    const regExp = /^[\w]{2,10}$/;
    return regExp.test(idInput);
}

function is_pwd(pwdInput) {
    const regExp = /^[\w!@#$%^&*-]{8,20}$/;
    return regExp.test(pwdInput);
}

function input() {
    const inputId = document.getElementById('input--id');
    const idStatus = document.querySelector('.id-status');

    if (!is_id(inputId.value)) {
        idStatus.classList.add('danger');
    } else {
        idStatus.classList.remove('danger');
    }
}

function pwd() {
    const pwdStatus = document.querySelector('.pwd-status');

    if (!is_pwd(inputPwd.value)) {
        pwdStatus.classList.add('danger');
    } else {
        pwdStatus.classList.remove('danger');
    }
}

check.addEventListener('click', input);
inputPwd.addEventListener('blur', pwd);
