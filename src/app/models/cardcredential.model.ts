import { CardModel } from "./card.model";
import { TravelerModel } from "./traveler.model";

export class CardCredentialModel{
    _id:number=0;
    _card!:CardModel;
    _traveler!:TravelerModel;
    _startDateAndTime:string="";
    _endDateAdnTime:string="";
    _status:boolean=false;

    getID(){return this._id}
    
    getCard(){return this._card}

    getTraveler(){return this._traveler}

    getStartDateAndTime(){return this._startDateAndTime}

    getEndDateAndTime(){return this._endDateAdnTime}

    getStatus(){return this._status}

    fromString(cardCredentialParameter:any){
        this._id = cardCredentialParameter["id"];
        this._card = new CardModel();
        this._card.fromString(cardCredentialParameter["card"]);
        this._traveler = new TravelerModel();
        this._traveler.fromString(cardCredentialParameter["traveler"]);
        this._startDateAndTime = cardCredentialParameter["startDateandTime"];
        this._endDateAdnTime = cardCredentialParameter["endDateandTime"];
        this._status = cardCredentialParameter["status"];
    }
}