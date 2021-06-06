window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.error-text-output');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const mobileNo = document.querySelector('#mobile');
    const mobileError = document.querySelector('.error-mobile-output');
    mobileNo.addEventListener('input', function () {
        if (mobileNo.value.length == 0) {
            mobileError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).phoneNo = mobileNo.value;
            mobileError.textContent = "";
        } catch (e) {
            mobileError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipErr = document.querySelector('.error-zip-output');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            zipErr.textContent = "";
            return;
        }
        try {
            (new AddressBook()).zipCode = zip.value;
            zipErr.textContent = "";
        } catch (e) {
            zipErr.textContent = e;
        }
    });

    

});