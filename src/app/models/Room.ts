import { Floor } from "./Floor";

export class Room{
    private _id=0;
    private _number=0;
    private _floor!: Floor;
    private _cost=0;
    private _type="";
    private _reservation=false;

    getID(){return this._id;}

    getNumber(){return this._number;}

    getFloor(){return this._floor;}

    getCost(){return this._cost;}

    getType(){return this._type;}

    getReservation(){return this._reservation;}

    setID(id:number){
        this._id = id;
    }

    setNumber(number:number){
        this._number = number;
    }

    setFloor(floor:Floor){
        this._floor = floor;
    }

    setCost(cost:number){
        this._cost = cost;
    }

    setType(type:string){
        this._type = type;
    }

    setReservation(reservation:boolean){
        this._reservation = reservation;
    }
}
