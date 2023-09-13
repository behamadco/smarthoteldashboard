import { RoomModel } from "./room.mode";

export class RoomPhotoModel{
    _id:number=0;
    _title:string="";
    _alt:string="";
    _address:string="";
    _dateAndTime:string="";
    _room!:RoomModel;

    getID(){ return this._id }

    getTitle(){ return this._title }

    getAlt(){ return this._alt }

    getAddress(){ return this._address }

    getDateAndTime(){ return this._dateAndTime }

    getRoom(){ return this._room }
    
    fromString(roomPhotoParameter:any){
        this._id = roomPhotoParameter["id"];
        this._title = roomPhotoParameter["title"];
        this._alt = roomPhotoParameter["alt"];
        this._address = roomPhotoParameter["file"];
        this._dateAndTime = roomPhotoParameter["dateandtime"];
        this._room = new RoomModel();
        this._room.fromString(roomPhotoParameter["room"])
    }
}