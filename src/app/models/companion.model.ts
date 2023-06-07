export class CompanionModel{
    _id:number=0;
    _firstName:string="";
    _lastName:string="";
    _phoneNumber:string="";
    _nationalCode:string="";

    getID(){return this._id}

    getFirstName(){return this._firstName}

    getLastName(){return this._lastName}
    
    getPhoneNumber(){return this._phoneNumber}
    
    getNationalCode(){return this._nationalCode}

    fromString(companionParameter:any){
        this._id = companionParameter['id'];
        this._firstName = companionParameter["firstName"];
        this._lastName = companionParameter["lastName"];
        this._phoneNumber = companionParameter["phoneNumber"];
        this._nationalCode = companionParameter["nationalCode"];
    }
}