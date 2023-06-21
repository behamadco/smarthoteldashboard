import { CompanionModel } from "./companion.model";
import { RoomModel } from "./room.mode";
import { TravelerModel } from "./traveler.model";

export class ResidenceModel{
    _id:number=0;
    _code:string="";
    _traveler!:TravelerModel;
    _startDateAndTime:string="";
    _endDateAndTime:string="";
    _companions:CompanionModel[]=[];
    _rooms:RoomModel[]=[];
    _status:string="";

    getID(){ return this._id }

    getCode(){ return this._code }

    getTraveler(){ return this._traveler }

    getStartDateAndTime(){ return this._startDateAndTime }

    getEndDateAndTime(){ return this._endDateAndTime }

    getCompanions(){ return this._companions }

    getRooms(){ return this._rooms }

    getStatus(){ return this._status }

    fromString(residenceParameter:any){
        this._id = residenceParameter["id"];
        this._code = residenceParameter["code"];
        this._traveler = new TravelerModel();
        this._traveler.fromString(residenceParameter["traveler"]);
        this._startDateAndTime = residenceParameter["startdateandtime"];
        this._endDateAndTime = residenceParameter["enddateandtime"];
        this._status = residenceParameter["status"];

        var companionAsArray = Array.from(residenceParameter["companions"]);
        for(var index=0;index<companionAsArray.length;index++){
            let companion:CompanionModel = new CompanionModel();
            companion.fromString(companionAsArray[index]);
            this._companions.push(companion);
        }

        var roomsAsArray = Array.from(residenceParameter["rooms"]);
        for(var index=0;index<roomsAsArray.length;index++){
            let room:RoomModel = new RoomModel();
            room.fromString(roomsAsArray[index]);
            this._rooms.push(room);
        }
    }
}