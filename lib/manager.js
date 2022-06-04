const Employee = require ('./employee');

class Manager extends Employee {

    constructor (name, id, email, phonenumber) {
        super (name, id, email);
        this.phonenumber = phonenumber;
    }

    getRole() {
        return 'Manager';
    }

    getPhoneNumber() {
        return this.phonenumber;
    }

}

module.exports = Manager;