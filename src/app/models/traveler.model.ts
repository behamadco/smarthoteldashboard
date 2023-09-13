import { CompanionModel } from "./companion.model";
import { RoomModel } from "./room.mode";

export class TravelerModel{
    _id:number=0;
    _firstName:string="";
    _lastName:string="";
    _phoneNumber:string="";
    _nationalCode:string="";
    _originCountrey:string = "";
    _originCity:string = "";
    _status:string="";
    _lodging:string="";
    _companions!:CompanionModel[];
    _room!:RoomModel;

    getID(){return this._id}

    getFirstName(){return this._firstName}

    getLastName(){return this._lastName}
    
    getPhoneNumber(){return this._phoneNumber}
    
    getNationalCode(){return this._nationalCode}

    getOriginCountrey(){return this._originCountrey}

    getOriginCity(){return this._originCity}

    getStatus(){return this._status}

    getLodging(){return this._lodging}

    fromString(travelerParameter:any){
        this._id = travelerParameter['id'];
        this._firstName = travelerParameter["firstName"];
        this._lastName = travelerParameter["lastName"];
        this._phoneNumber = travelerParameter["phoneNumber"];
        this._nationalCode = travelerParameter["nationalCode"];
        this._originCountrey = travelerParameter["originCountrey"];
        this._originCity = travelerParameter["originCity"];
        this._status = travelerParameter["status"];
        this._lodging = travelerParameter["lodging"];
    }
}