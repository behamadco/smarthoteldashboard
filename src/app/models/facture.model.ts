import { ItemModel } from "./item.model";
import { RoomModel } from "./room.mode";
import { TravelerModel } from "./traveler.model";

export class FactureModel{
    _id:number=0;
    _number:string="";
    _item:ItemModel[]=[];
    _room!:RoomModel;
    _traveler!:TravelerModel;
    _description:string="";
    _cost:number=0;
    _timestamp:string="";
    
    getID(){return this._id}

    getNumber(){return this._number}

    getItem(){return this._item}

    getDescription(){return this._description}

    getCost(){return this._cost}

    getTimeStamp(){return this._timestamp}

    fromString(factureParameters:any){
        this._id = factureParameters["id"];
        this._number = factureParameters["number"];
        this._room = new RoomModel();
        this._room.fromString(factureParameters["room"]);
        this._traveler = new TravelerModel();
        this._traveler.fromString(factureParameters["traveler"]);
        this._description = factureParameters["description"];
        this._cost = factureParameters["cost"];
        this._timestamp = factureParameters["timestamp"];

        let itemAsArray:any = Array.from(factureParameters["item"]);
        for(var index=0;index<itemAsArray.length;index++){
            let item:ItemModel = new ItemModel();
            item.fromString(itemAsArray[index]);
            this._item.push(item);
        }
    }
}