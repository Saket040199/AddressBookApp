let isUpdate = false;
let addressBookObj = {};

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
    checkForUpdate();
});

const save = () => {
    try{
    let addressBookData = createAddressBook();
    createAndupdateStorage(addressBookData);
    document.location.replace(site_properties.home_page);
    }catch (e){
        return;
    }
}

const createAddressBook = () =>{
    let addressBookData = new AddressBook();
    try {
        addressBookData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.error-text-output', e);
        throw e;
    }
    addressBookData.id = new Date().getTime() +1;
    addressBookData.phoneNo = getInputValueById('#mobile');
    addressBookData.address = getInputValueById('#address');
    let city = document.querySelector('#city').value;
    addressBookData.city = city;
    let state = document.querySelector('#state').value;
    addressBookData.state = state;
    addressBookData.zipCode = getInputValueById('#zip');
    alert("Contact Details: "+addressBookData.toString());
    return addressBookData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndupdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem('AddressBookList'));

    if (addressBookList != undefined) {
        addressBookList.push(addressBookData);
    } else {
        addressBookList = [addressBookData];
    }
    alert("Local Contact Details: "+addressBookList.toString());
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editContact');
    isUpdate = addressBookJson ? true : false;
    if(!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObj._name);
    setValue('#mobile', addressBookObj._phoneNo);
    setValue('#address', addressBookObj._address);
    document.querySelector('#city').value = addressBookObj._city;
    document.querySelector('#state').value = addressBookObj._state;
    document.querySelector('#zip').value = addressBookObj._zipCode;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedValue = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(value.includes(item.values)){
            item.checked = true;
        }
        else if (item.value === value)
        item.checked = true;
    });
}

