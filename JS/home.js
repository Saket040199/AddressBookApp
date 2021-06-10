let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")){
        getAddressBookDataFromStorage();
    }else getAddressBookDataFromServer();    
});

const getAddressBookDataFromStorage = () => {
    addressBookList =  localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressBookDataResponse();
}

const processAddressBookDataResponse = () => {
    createInnerHtml();
    localStorage.removeItem('editContact');
}

const getAddressBookDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
       .then(responseText => {
           addressBookList = JSON.parse(responseText);
           processAddressBookDataResponse();
       })
       .catch(error => {
           console.log("GET Error Status: "+ JSON.stringify(error));
           addressBookList = [];
           processAddressBookDataResponse();
       });
}

const createInnerHtml = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th>" +
                       "<th>ZipCode</th><th>PhoneNo</th><th></th>";
    let innerHtml = `${headerHtml}`;
    if(addressBookList.length == 0) return;
    for (const addressBookData of addressBookList) {
        innerHtml = `${innerHtml}
     <tr>
     <td>${addressBookData._name}</td>
     <td>${addressBookData._address}</td>
     <td>${addressBookData._city}</td>
     <td>${addressBookData._state}</td>
     <td>${addressBookData._zipCode}</td>
     <td>${addressBookData._phoneNo}</td>
     <td>
     <img id="${addressBookData.id}" onclick="remove(this)" alt="delete"
     src="../Assets/outline_remove_circle_black_24dp.png">
     <img id="${addressBookData.id}" alt="edit" onclick="update(this)"
     src="../Assets/outline_edit_black_24dp.png">
     </td>
     </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressBookList.find(addData => addData.id == node.id);
    if(!addressBookData) return;
    const index = addressBookList
                  .map(addData => addData.id)
                  .indexOf(addressBookData.id);
    addressBookList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")) {
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
    createInnerHtml();
    window.location.replace(site_properties.home_page);
    } else {
        const deleteURl = site_properties.server_url + addressBookList.id.toString();
        makeServiceCall("DELETE", deleteURl, false)
            .then(responseText => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: "+ JSON.stringify(error));
            });
    }
}

const update = (node) => {
    let addressBookData = addressBookList.find(addData => addData.id == node.id);
    if(!addressBookData) return;
    localStorage.setItem('editContact', JSON.stringify(addressBookData));
    window.location.replace(site_properties.AddressBook_page);
}
 