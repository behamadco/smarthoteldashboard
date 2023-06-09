export class RoomType{
    _id:number=0;
    _title:string="";


    getID(){return this._id}

    getTitle(){return this._title}

    fromString(roomTypeParameter:any){
        this._id = roomTypeParameter["id"];
        this._title = roomTypeParameter["title"];
    }
}