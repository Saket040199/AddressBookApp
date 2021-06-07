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

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        createAndupdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
    //alert(addressBookObj.toString());
}

const setAddressBookObject = () => {
    try {
        
        addressBookObj._name = document.querySelector('#name').value;
        addressBookObj._phoneNo = document.querySelector('#mobile').value;
        addressBookObj._address = document.querySelector('#address').value;
        addressBookObj._city = document.querySelector('#city').value;
        addressBookObj._state = document.querySelector('#state').value;
        addressBookObj._zipCode = document.querySelector('#zip').value;
    } catch (e) {
        alert("Please enter valid details!");
    }
}

const createNewConatctId = () => {
    let personID = localStorage.getItem("ContactID");
    personID = !personID ? 1 : (parseInt(personID) + 1).toString();
    localStorage.setItem("ContactID", personID);
    return personID;
}

const createAndupdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem('AddressBookList'));
    if (addressBookList) {
        let addressData = addressBookList.find(address => address._id == addressBookObj._id);
        if (!addressData) {
            addressBookList.push(createAddressBookData());
        } else {
            const index = addressBookList.map(address => address._id)
                                         .indexOf(addressData._id);
            addressBookList.splice(index, 1, createAddressBookData(addressData._id));
        }
    } else {
        addressBookList = [createAddressBookData()];
    }
    // alert("Local Contact Details: "+addressBookObj.toString());
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
}

const createAddressBookData = (id) => {
    let addressBookData = new AddressBook();
    if (!id) addressBookData.id = createNewConatctId();
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const setAddressBookData = (addressBookData) => {
    try {
        addressBookData.name = addressBookObj._name;
    } catch (e) {
        setTextValue('.error-text-output', e);
        throw e;
    }
    addressBookData.phoneNo = addressBookObj._phoneNo;
    addressBookData.address = addressBookObj._address;
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    addressBookData.zipCode = addressBookObj._zipCode;
    alert(addressBookData.toString());
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editContact');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
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

function resetForm() {
    document.querySelector("#name").value = "";
    document.querySelector('#mobile').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#city').value = "";
    document.querySelector('#state').value = "";
    document.querySelector('#zip').value = "";
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}


const setSelectedValue = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (value.includes(item.values)) {
            item.checked = true;
        }
        else if (item.value === value)
            item.checked = true;
    });
}

