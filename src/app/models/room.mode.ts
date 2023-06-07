import { FloorModel } from "./floor.model";

export class RoomModel{
    _id:number=0;
    _number:number=0;
    _floor!:FloorModel;
    _cost:number=0;
    _type:string="";
    _reservation:boolean=false;

    setID(id:number){this._id=id}

    setNumber(number:number){this._number=number}

    setCost(cost:number){this._cost=cost}

    setType(type:string){this._type=type}

    setReservation(reservation:boolean){this._reservation=reservation}

    getID(){return this._id}

    getNumber(){return this._number}

    getCost(){return this._cost}

    getType(){return this._type}

    getReservation(){return this._reservation}

    fromString(roomParameters:any){
        this._id = roomParameters["id"];
        this._number = roomParameters["number"];
        this._floor = new FloorModel();
        this._floor.fromString(roomParameters["floor"]);
        this._cost = roomParameters["cost"];
        this._type = roomParameters["type"];
        this._reservation = roomParameters["reservation"];
    }
}