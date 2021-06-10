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
            checkName(name.value);
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
            checkPhone(mobileNo.value);
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
            checkZip(zip.value);
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
        if(site_properties.use_local_storage.match("true")){
        createAndupdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
        }else {
            createOrUpdateAddressBook();
        }
    } catch (e) {
        return;
    }
    //alert(addressBookObj.toString());
}

const createOrUpdateAddressBook = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate) {
        methodCall = "PUT";
        postURL = postURL + addressBookObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, addressBookObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}

const setAddressBookObject = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")) {
        addressBookObj.id = createNewConatctId();
    }
        addressBookObj._name = document.querySelector('#name').value;
        addressBookObj._phoneNo = document.querySelector('#mobile').value;
        addressBookObj._address = document.querySelector('#address').value;
        addressBookObj._city = document.querySelector('#city').value;
        addressBookObj._state = document.querySelector('#state').value;
        addressBookObj._zipCode = document.querySelector('#zip').value;
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
        let addressData = addressBookList.find(address => address.id == addressBookObj.id);
        if (!addressData) {
            addressBookList.push(addressBookObj);
        } else {
            const index = addressBookList.map(address => address.id)
                                         .indexOf(addressData.id);
            addressBookList.splice(index, 1, addressBookObj);
        }
    } else {
        addressBookList = [addressBookObj];
    }
    // alert("Local Contact Details: "+addressBookObj.toString());
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
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

