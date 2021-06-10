const checkName = (name) => {
    let regExp = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
    if (!regExp.test(name))
        throw 'Name is Incorrect'
}

const checkPhone = (phoneNo) => {
    let regExp = RegExp('^[0-9]{10}$');
    if (!regExp.test(phoneNo))
        throw "Invalid number!! please enter valid 10 digit number :)"
}
const checkZip = (zip) => {
    let regExp = RegExp('^[0-9]{6}$');
    if (!regExp.test(zip))
        throw "Incorrect Zip !!"
}