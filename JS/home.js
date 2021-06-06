let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getAddressBookDataFromStorage();
    createInnerHtml();
    localStorage.removeItem('editContact');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
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
     <img id="${addressBookData._id}" onclick="remove(this)" alt="delete"
     src="../Assets/outline_remove_circle_black_24dp.png">
     <img id="${addressBookData._id}" alt="edit" onclick="update(this)"
     src="../Assets/outline_edit_black_24dp.png">
     </td>
     </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressBookList.find(addData => addData._id == node.id);
    if(!addressBookData) return;
    const index = addressBookList
                  .map(addData => addData._id)
                  .indexOf(addressBookData._id);
    addressBookList.splice(index, 1);
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
    createInnerHtml();
    window.location.replace(site_properties.home_page);
}

const update = (node) => {
    let addressBookData = addressBookList.find(addData => addData._id == node.id);
    if(!addressBookData) return;
    localStorage.setItem('editContact', JSON.stringify(addressBookData));
    window.location.replace(site_properties.AddressBook_page);
}
 