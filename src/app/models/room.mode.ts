import { FloorModel } from "./floor.model";

export class RoomModel{
    _id:number=0;
    _number:number=0;
    _floor!:FloorModel;
    _cost:number=0;
    _type:string="";
    _reservation:boolean=false;
    _status:string="";

    getID(){return this._id}

    getNumber(){return this._number}

    getFloor(){return this._floor}

    getCost(){return this._cost}

    getType(){return this._type}

    getReservation(){return this._reservation}

    getStatus(){ return this._status }

    fromString(roomParameters:any){
        this._id = roomParameters["id"];
        this._number = roomParameters["number"];
        this._floor = new FloorModel();
        this._floor.fromString(roomParameters["floor"]);
        this._cost = roomParameters["cost"];
        this._type = roomParameters["roomType"];
        this._reservation = roomParameters["reservation"];
        this._status = roomParameters["status"];
    }
}