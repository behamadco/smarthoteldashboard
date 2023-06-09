import { RoomModel } from "./room.mode";

export class DeviceModel{
    _id:number=0;
    _name:string="";
    _room!:RoomModel;
    _macAddress:string="";
    _topic:string="";
    _type:string="";

    getID(){return this._id}

    getName(){return this._name}

    getRoom(){return this._room}

    getMacAddress(){return this._macAddress}

    getTopic(){return this._topic}

    getType(){return this._type}

    fromString(deviceParameters:any){
        this._id = deviceParameters["id"];
        this._name = deviceParameters["name"];
        this._room = new RoomModel();
        this._room.fromString(deviceParameters["room"]);
        this._macAddress = deviceParameters["macAddress"];
        this._topic = deviceParameters["topic"];
        this._type = deviceParameters["type"];
    }
}