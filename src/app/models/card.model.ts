export class CardModel{
    _id:number=0;
    cardId:string="";

    getID(){return this._id}

    getCardId(){return this.cardId}

    fromString(cardParameter:any){
        this._id = cardParameter["id"];
        this.cardId = cardParameter["cardid"];
    }
}