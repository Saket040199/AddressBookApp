class AddressBook{

    get id(){return this._id}
    set id(id){
        this._id=id;
    }

    get name(){ return this._name;}
    set name(name) {
         let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
         if(nameRegex.test(name))
           this._name=name;
        else throw 'Name is Incorrect';
    }

    get address(){return this._address}
    set address(address){
        this._address=address;
    }

    get city(){return this._city}
    set city(city){
        this._city=city;
    }

    get state(){return this._state}
    set state(state){
        this._state=state;
    }

    get zipCode(){return this._zipCode}
    set zipCode(zipCode){
        let zipRegex=RegExp('^[0-9]{6}$');
        if(zipRegex.test(zipCode))
          this._zipCode=zipCode;
       else throw 'ZipCode is Incorrect';
    }

    get phoneNo(){return this._phoneNo}
    set phoneNo(phoneNo){
        let mobileRegex=RegExp('^[0-9]{10}$');
        if(mobileRegex.test(phoneNo))
          this._phoneNo=phoneNo;
       else throw 'Number is Incorrect';
    }

    toString(){
        return "id = "+this.id + " name = "+this.name+" address = "+this.address+ 
               " city = "+this.city+ " state = "+this.state +" phoneNo = "+ this.phoneNo +" zipCode = "+
               this.zipCode  ;
    }
}