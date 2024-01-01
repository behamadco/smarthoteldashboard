import { ItemModel } from "./item.model";
import { RoomModel } from "./room.mode";
import { TravelerModel } from "./traveler.model";

export class FactureModel{
    _id:number=0;
    _number:string="";
    _title:string="";
    _traveler!:TravelerModel;
    _description:string="";
    _cost:number=0;
    _timestamp:string="";
    _status:string = "";
    
    getID(){return this._id}

    getNumber(){return this._number}

    getTitle(){return this._title}

    getDescription(){return this._description}

    getCost(){return this._cost}

    getTimeStamp(){return this._timestamp}

    getStatus(){return this._status}

    updateStatus(status:string){
        this._status = status;
    }

    fromString(factureParameters:any){
        this._id = factureParameters["id"];
        this._number = factureParameters["number"];
        this._title = factureParameters["title"];
        this._traveler = new TravelerModel();
        this._traveler.fromString(factureParameters["traveler"]);
        this._description = factureParameters["description"];
        this._cost = factureParameters["cost"];
        this._timestamp = factureParameters["timestamp"];
        this._status = factureParameters["status"];
    }
}