export class CardModel{
    _id:number=0;
    cardId:string="";

    setID(id:number){this._id = id}

    setCardId(cardId:string){this.cardId = cardId}

    getID(){return this._id}

    getCardId(){return this.cardId}

    fromString(cardParameter:any){
        this._id = cardParameter["id"];
        this.cardId = cardParameter["cardid"];
    }
}