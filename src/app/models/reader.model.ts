import { CardModel } from "./card.model";
import { RoomModel } from "./room.mode";

export class ReaderModel{
    _id:number=0;
    _room!:RoomModel;
    _macAddress:string="";
    _processor:string="";
    _card!:CardModel;
    _supportCard!: CardModel
    _status:boolean=false;

    getID(){return this._id}

    getRoom(){return this._room}

    getMacAddress(){return this._macAddress}

    getCard(){return this._card}

    getSupportCard(){return this._supportCard}

    getStatus(){return this._status}

    fromString(readerParameters:any){
        this._id = readerParameters["id"];
        this._room = new RoomModel();
        this._room.fromString(readerParameters["room"]);
        this._macAddress = readerParameters["macAddress"];
        this._card = new CardModel();
        this._card.fromString(readerParameters["card"]);
        this._supportCard = new CardModel();
        this.fromString(readerParameters["supportCard"]);
        this._status = readerParameters["status"];
    }
}